# Frontend Sync — Product Tax, Weight, Checkout Token, Shipments

Status: **draft for review — no code written yet**

This applies the backend changes from the `shippers` branch (house-maduekwe-backend) to
this repo: `ShopItem.vat` → `productTax` + new `weight`, the checkout JWT/`totalProductTax`
split, removal of `PATCH /api/orders/:id/status`, and the new Shipment resource. Every
file path and field name below was confirmed by reading the actual current source on
both sides, not assumed.

---

## 0. What already exists that this plan builds on

| Piece | Where | Relevance |
|---|---|---|
| ShopItem admin forms | `src/pages-dashboard/product-design/index.jsx`, `product-update/index.jsx` | Single-page Formik forms, two-column grid. `vat` state key used as `initialValues.vat`, destructured, and bound to a `CustomInput` whose **label already reads "Product Tax"** — only the state key/`id`/`name` and the Yup schema key need to change, not the label. |
| ShopItem validation | `src/features/validations/shopItem-validation.js:55-58` | `vat: Yup.number().required().min(0)` — becomes `productTax`, same rules. |
| FormData builder | `src/utilities/basic-functions.js:220` (`buildShopItemFormData`) | Spreads all top-level Formik values generically into one JSON `data` field — **no change needed here**, it doesn't name `vat` explicitly. |
| Orders admin page | `src/pages-dashboard/orders/index.jsx` | Renders `<ManageModal id={row.original._id} />` per row in a "Manage Status" column. Has its own hand-duplicated `ORDER_STATUS` const (with an extra `ALL: ''` key). |
| Status modal | `src/pages-dashboard/orders/elements/manage-modal/manage-modal.jsx` (+ `.style.js`) | Formik form: picks any `ORDER_STATUS`, and only when `status === 'shipped'` shows a "Shipping Details" box collecting `company` + `trackingNumber`, merged into the status-update payload. Calls `OrderServices.updateStatus` (now-dead `PATCH /:id/status`) or `OrderServices.cancel` (still-live `PATCH /:id/cancel`) if `status === 'cancelled'`. |
| Order/checkout hooks | `src/features/services/custom-hooks/orders.js` | `useConfirmCheckoutMutation`, `useCheckoutMutation`, `useGuestCheckoutMutation`, `useUpdateOrderStatusMutation` (dead), `useCancelOrderMutation` (alive). No `guest-confirm-checkout` hook exists yet. None of the three checkout mutations send/read `checkoutToken`. |
| Checkout totals display | `src/pages/user-cart/index.jsx` | For logged-in users, displays `checkoutData.order.{totalAmount,totalVat}` and `checkoutData.payment.amountToPay` straight from the API response (lines ~640-676) — no client math, so this is low-risk, just needs a new row. For **guests**, `localCartSummary` (lines 280-324) does its own client-side percentage math: `itemVat = itemSubtotal * (product.vat / 100)`, `orderTotal = subtotal + totalVat` — this reads `product.vat` directly and needs both a field rename **and** a new `totalProductTax` term, computed the same way (`checkoutItemsTotals` in the backend applies `productTax` as a per-item percentage of that item's subtotal, identical shape to how `vat` is applied there). |
| Other order-total displays | `src/pages/checkout /index.jsx` (note: literal trailing space in dir name), `src/pages/guest-order/index.jsx`, `src/pages/settings/elements/preview-order/preview-order.jsx`, `src/pages-dashboard/orders-details/index.jsx` | All display `totalVat`/`totalAmount`/`amountToPay` straight from the API, no recompute — just need a `totalProductTax` row added next to the existing VAT row. |
| `checkoutToken` | grepped repo-wide | Zero references anywhere — fully new wiring. |
| `/api/shipments`, `/api/shipping-settings` | grepped repo-wide | Zero references anywhere — fully new feature, no existing hooks/pages/nav entries to conflict with. |
| `src/utilities/app-const.js` | — | Has `ORDER_STATUS` and `CHECKOUT_TYPES` but no `SHIPMENT_STATUS` and no weight-unit enum. |

Backend reference (already shipped, for exact shapes):
- `ShopItem.weight = { value: Number≥0, unit: enum[kg,g,lb,oz] default kg }` (`shopItemModel.js:86-96`)
- `checkoutItemsTotals` applies `productTax` as **percent of that item's line subtotal**, same mechanics as `vat` (`checkoutController.js:924-985`)
- Shipment fields (`shipmentModel.js`): `{ order, provider, providerShipmentId, carrier, trackingNumber, trackingUrl, status, shippingCost, currency, shippedAt, deliveredAt, createdBy }`; `SHIPMENT_STATUS = { pending, label_created, picked_up, in_transit, out_for_delivery, delivered, failed, cancelled }`
- `POST /api/shipments/orders/:id` body: optional `{ carrier, trackingNumber, trackingUrl }` (internal provider **requires** `carrier` + `trackingNumber`, throws otherwise) → `201 { shipment, order }`
- `PATCH /api/shipments/orders/:id/status` body: `{ status }` (must be a valid `SHIPMENT_STATUS`) → `200 { shipment, order }`
- `GET /api/shipments/orders/:id` → `200 <shipment>` or `404` if none exists yet
- **No list-all endpoint exists yet** (`GET /api/shipments`) — see Phase 0 below.

---

## Phasing

```
Phase 0  Backend: add GET /api/shipments (list, paginated, filterable)   — small, done before frontend work
Phase 1  Admin: ShopItem forms — vat → productTax rename + weight UI      — "delicate", most care here
Phase 2  Admin: Orders page — drop dead status editor, keep cancel        — small
Phase 3  Admin: Shipments — repurposed modal + new list page + nav entry — the bulk of new work
Phase 4  Customer-facing: guest checkout mirrors logged-in confirm flow, totalProductTax rows, checkoutToken
```

Each phase is independently shippable/testable in isolation.

---

## Phase 0 — Backend: list-all shipments endpoint

You left this as my call ("we might not need to create shipment page now... or you can add it
now before you go to the front end then now also create the shipment page there"). Recommendation:
**add it now.** It's small, and without it there's no way to build the "shipment page" with
"the whole page and period" you also asked for — the per-order endpoints alone can't back a
list view.

- `shipmentController.js`: new `getAllShipments` — `GET /api/shipments`, admin-only, query
  params `status`, `from`/`to` (date range on `createdAt`), `page`/`limit`, populates `order`
  (id, `consigneesName`, `status`, `totalAmount`) so the list page doesn't need N+1 order fetches.
- `shipmentRoutes.js`: `router.get("/", adminOnly, getAllShipments);` — placed before
  `/orders/:id` is unambiguous already since the path literally differs (`/` vs `/orders/:id`),
  no route-ordering risk.
- No model/validation changes needed — this is a pure read endpoint.

If you'd rather defer this and only ship the per-order create/update flow (reachable from the
Orders page) in this round, say so and I'll drop Phase 0 and the "Shipments list page" half of
Phase 3, keeping only the repurposed per-order modal.

---

## Phase 1 — Admin ShopItem forms (delicate — going carefully)

**Files touched (4):**

1. `src/pages-dashboard/product-design/index.jsx`
   - `initialValues.vat: 0` → `initialValues.productTax: 0`
   - `initialValues.weight: { value: 0, unit: 'kg' }` (new)
   - Destructure `vat` → `productTax`; destructure `weight`
   - Input block: `id`/`name`/`value`/`isError`/`errormessage` all `vat` → `productTax` (label
     stays "Product Tax", it's already correct)
   - New `form_control` block directly after the Quantity field (before the file input), holding
     two side-by-side inputs: a `CustomInput type="number"` for `weight.value` (`name="weight.value"`,
     Formik dot-path) and a `CustomSelect` for `weight.unit` sourced from a new `WEIGHT_UNITS`
     array in `app-const.js` (`['kg','g','lb','oz']`), defaulting to `kg`.

2. `src/pages-dashboard/product-update/index.jsx` — identical changes, reading initial values
   from `product?.productTax || 0` and `product?.weight || { value: 0, unit: 'kg' }` (existing
   products before the backend migration ran will have `productTax` backfilled already per your
   `migrateTaxAndVatFields` setup script — no `undefined` case expected, but defaulting defensively
   anyway).

3. `src/features/validations/shopItem-validation.js` — rename the `vat` key to `productTax`
   (same `.required().min(0)` rules, error copy updated to say "Product Tax" instead of "VAT"),
   add:
   ```js
   weight: Yup.object({
     value: Yup.number().typeError('Weight must be a number').min(0, 'Weight cannot be negative').required('Weight is required'),
     unit: Yup.string().oneOf(['kg', 'g', 'lb', 'oz']).required(),
   }),
   ```
   Open question: backend schema does **not** require `weight.value` (no `required` on it,
   default only applies to `unit`). Making it required client-side would block admins from saving
   products with unknown weight. I'll make `weight.value` **optional** (`.min(0)` only, no
   `.required()`) to match the backend exactly, defaulting the input to empty rather than `0` so
   an admin isn't misled into thinking `0` was intentionally entered.

4. `src/utilities/app-const.js` — add:
   ```js
   export const WEIGHT_UNITS = ['kg', 'g', 'lb', 'oz'];
   ```

No change needed to `buildShopItemFormData`/`basic-functions.js` (confirmed generic passthrough).

---

## Phase 2 — Admin Orders page: drop the dead status editor, keep cancel

The backend route behind `OrderServices.updateStatus` is gone; leaving that button in place
would just produce dead 404s. But `manage-modal.jsx` was also the *only* place an admin could
cancel an order (it special-cased `status === 'cancelled'` → `OrderServices.cancel`), and that
endpoint (`PATCH /api/orders/:id/cancel`) is still live — removing the modal wholesale would
silently remove cancel capability too, which you didn't ask for.

- `src/pages-dashboard/orders/index.jsx`: remove the `<ManageModal>` import/usage and the
  "Manage Status" column entirely.
- Add a small standalone "Cancel Order" action in its place (icon button + confirm prompt,
  no modal needed — mirrors how `cancelOrder` is already a single-field mutation) calling the
  existing `OrderServices.cancel({ id })`. Only shown for cancellable statuses (`pending`,
  `paid`, `processing` — matching whatever `cancelOrder` itself already guards against
  server-side, so a disabled/hidden state here is just UX, not a new authorization decision).
- Delete `src/pages-dashboard/orders/elements/manage-modal/` — **but see Phase 3**: its
  Formik-with-conditional-fields *shape* is the right starting point for the new shipment
  modal, so I'll use it as a reference while writing the new component rather than editing
  it in place (it's moving to a new feature area, `pages-dashboard/shipments/`, not staying
  under `orders/`).
- `useUpdateOrderStatusMutation` removed from `src/features/services/custom-hooks/orders.js`
  (dead code, no other consumers — confirmed).

---

## Phase 3 — Admin Shipments (new feature)

**New hooks file** — `src/features/services/custom-hooks/shipments.js`, same pattern as
`orders.js` (`useMutation`/`useQuery` + `axiosCall`, grouped export):

```js
ShipmentServices = {
  getAll,              // GET /api/shipments        (query: status, from, to, page, limit)
  getForOrder,         // GET /api/shipments/orders/:id
  useGetForOrder,      // query hook, used to decide create-vs-update UI
  create,              // POST /api/shipments/orders/:id   { carrier, trackingNumber, trackingUrl? }
  updateStatus,         // PATCH /api/shipments/orders/:id/status  { status }
}
```

**New shipment modal** — `src/pages-dashboard/shipments/elements/shipment-modal/shipment-modal.jsx`
(+ `.style.js`, reusing the existing dashed-border `.shipping_box` style from the old
`manage-modal.style.js`). Behavior, keyed off whether `useGetForOrder(orderId)` returns a
shipment yet:
- **No shipment yet** → "Create Shipment" mode: `CustomInput` for `carrier` (required) and
  `trackingNumber` (required), optional `trackingUrl`. Submits `ShipmentServices.create`.
- **Shipment exists** → "Update Shipment Status" mode: `CustomSelect` over the new
  `SHIPMENT_STATUS` enum (`app-const.js`), read-only display of `carrier`/`trackingNumber`/
  `trackingUrl` underneath (not editable post-creation — the backend has no update-details
  endpoint, only status). Submits `ShipmentServices.updateStatus`.

This one modal is used from two places:
1. Orders page — a "Manage Shipment" action per row (only enabled for `paid`/`processing`
   orders, matching `SHIPPABLE_ORDER_STATUSES` server-side), replacing the old status column.
2. Shipments page (below) — an "Edit" action per row, satisfying "in the shipment page we
   should be able to edit the shipment too."

**New page** — `src/pages-dashboard/shipments/index.jsx`: list view mirroring the structure of
`orders/index.jsx` (status tabs sourced from `SHIPMENT_STATUS`, table columns: Order ID /
Carrier / Tracking Number / Status / Shipped At / Delivered At / Edit), backed by
`ShipmentServices.getAll` with the tab as a `status` filter and a date-range picker for
"period" (your word) mapped to `from`/`to` query params.

- `src/utilities/app-const.js` — add:
  ```js
  export const SHIPMENT_STATUS = {
    PENDING: 'pending', LABEL_CREATED: 'label_created', PICKED_UP: 'picked_up',
    IN_TRANSIT: 'in_transit', OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered', FAILED: 'failed', CANCELLED: 'cancelled',
  };
  ```
- New route `/admin/shipments` in `App.jsx` + new sidebar nav entry (wherever the Orders link
  is registered — same dashboard nav list).

---

## Phase 4 — Customer-facing: guest checkout mirrors logged-in confirm flow, totalProductTax, checkoutToken

Resolved per your answer: guest checkout gets a real confirm/review step, mirroring the
logged-in cart page's `confirmCheckout` behavior (real totals, stock-issue exclusion, pending-order
handling) instead of relying on client-side estimates or reactive error handling. `localCartSummary`
stays in the code as-is (mechanically synced) but is demoted to a rough instant estimate — it's no
longer the source of truth for what the guest actually pays.

**Backend note (no change needed):** `guestConfirmCheckout` already mirrors `confirmCheckout`
exactly — same `guestCheckoutValidationSchema` (needs the full `consigneesName`/`email`/`address`,
not just items), same `stock` array, same `checkoutToken`, and it already checks for an existing
un-cancelled pending order by email (`isPendingOrder`/`pendingOrder`) before computing totals
(`checkoutController.js:341-405`). Nothing to build server-side — this phase is 100% frontend wiring.

**Where this applies:** two existing, near-duplicate guest-checkout forms both currently skip
straight to final `guestCheckout` with no confirm step and only catch a pending order *reactively*
(after the final submit already failed with `GUEST_PENDING_ORDER`), with zero stock-issue handling:
- `src/components/modal-assets/guest-checkout/guest-index.jsx` (`GuestCheckout`, reusable, rendered
  from the main cart page's guest flow)
- `src/layouts/index-layout/sub-components/holding.jsx` (the floating "holdings" drawer's own
  inline copy of the same form)

Both get the same two-step treatment (kept as two separate components, not merged — that's a
bigger refactor than this sync calls for; worth flagging as a future cleanup given how much these
two duplicate, but out of scope here unless you want it folded in):

1. **New hook** — `useGuestConfirmCheckoutMutation` (`POST /api/orders/guest-confirm-checkout`)
   added to `src/features/services/custom-hooks/orders.js`, exported on `CheckoutServices` next to
   the existing three.
2. **Step state** — each component gets `step` (`'details' | 'review'`), `reviewData` (last confirm
   response), and `excludedItems` (stock-issue item ids), mirroring `user-cart/index.jsx`'s existing
   pattern (`excludedItems` state, filtered into `finalItemIds` before the real request).
3. **Details → Review**: the existing Formik `onSubmit` no longer calls `guestCheckout` directly.
   It builds the same `guestData` payload as today (minus any already-excluded items) and calls
   `guestConfirmCheckout`:
   - `isPendingOrder: true` → show the pending-order banner **immediately** (same UI/copy/link to
     `/guest-order?orderId=...` that already exists for the reactive case) instead of advancing to
     review. The existing reactive `onError` handler on the final `guestCheckout` call stays too, as
     a race-condition fallback — cheap to keep, not worth removing.
   - `stock` contains any `!isAvailable` entries → add those item ids to `excludedItems`, toast the
     first issue's message (same pattern as `user-cart/index.jsx:209-210`), and re-run
     `guestConfirmCheckout` automatically with the reduced item list.
   - Clean result → store the response in `reviewData` (totals + `checkoutToken`) and advance to
     `step: 'review'`.
4. **Review step** (new UI, small): displays `totalAmount`, `totalVat`, `totalProductTax`,
   `shippingFee`, `amountToPay` from `reviewData.order`/`reviewData.payment`, plus a note if any
   items were excluded for stock reasons. Two actions: "Back to edit" (→ `step: 'details'`,
   discarding `reviewData`) and "Place Order" (calls `guestCheckout` with the same payload,
   `itemList` filtered by `excludedItems`, and `checkoutToken: reviewData.checkoutToken`).
5. Editing any detail field after reaching review resets `step` back to `'details'` (stale totals
   are never shown as if current) — simplest correct rule, same spirit as the logged-in page
   re-confirming whenever its inputs change.
6. `checkoutToken` **stays in component state**, not the URL — confirm and place-order happen
   within the same mounted component with no navigation in between, on both the logged-in cart
   page and these two guest forms, so there's nothing a URL round-trip would gain here. Taking your
   "if need be" as conditional: I'd only reach for the URL if confirm/submit ever get split across
   routes (e.g. a dedicated `/guest-checkout/review` page) — noting it here so it's an easy add if
   that changes, not doing it preemptively.

**Also in this phase (unchanged from before):**
- Logged-in side: `src/features/services/custom-hooks/orders.js` — the token round-trip on
  `useConfirmCheckoutMutation` → `useCheckoutMutation` is a **call-site** change in
  `user-cart/index.jsx`, not a hook shape change: stash the `checkoutToken` from the confirm
  response, send it back on `checkout`.
- `src/pages/user-cart/index.jsx`: add a "Product Tax" row next to the existing VAT row in the
  logged-in order-summary block (`checkoutData.order.totalProductTax`); `localCartSummary` gets
  the mechanical `product.vat` → `product.productTax` rename plus a `totalProductTax` term folded
  into `orderTotal`, per above now explicitly a rough pre-review estimate, not the charged amount.
- `src/pages/checkout /index.jsx`, `src/pages/guest-order/index.jsx`,
  `src/pages/settings/elements/preview-order/preview-order.jsx`,
  `src/pages-dashboard/orders-details/index.jsx`: add a "Product Tax" display row next to
  wherever `totalVat` is currently shown, reading `order.totalProductTax`. No math changes —
  all pure display.

---

## Open questions — resolved

1. Phase 0 (list endpoint): **add now.** ✅ locked in.
2. `weight.value`: **optional**, matches backend exactly. ✅ locked in.
3. Guest confirm flow: **build it**, mirroring `confirmCheckout` as closely as the guest data
   shape allows, covering stock validation and pending-order detection before the user reaches
   final submit. Spec above. ✅ locked in.

No remaining open questions. Once you approve, I'll implement Phase 0 → 4 in order, running the
existing backend test suite after Phase 0, and doing manual browser verification of the admin
ShopItem form, the admin shipments flow, and both the logged-in and guest checkout totals/review
steps before calling it done.
