import React, { useState, useRef } from 'react';
import {
	Container,
	TabNav,
	OptionBtn,
	TableWrapper,
	Search,
	SearchBtn,
	SpanStatus,
} from './elements/index.style';
import { roleType } from '../../utilities/app-const';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { RiAdminLine } from 'react-icons/ri';
import { FaUserTie } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';
import { FaUserPlus } from 'react-icons/fa';
import CustomTable from '../../components/table_components/basicTableOne';
import { NoDataIcon } from '../../components/icon-components/empty';
import UserServices from '../../features/services/custom-hooks/user';
import CreateAdmin from './elements/modal/create-admin';
import ManageUserRole from './elements/modal/manage-user-role';

function Index() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const section = searchParams.get('status') || roleType.ADMIN;
	const page = Number(searchParams.get('page')) || 1;
	const [searchValue, setSearchValue] = useState('');

	const { data, isPending, isError, refetch } = UserServices.getUsers({
		role: section,
		userId: searchValue,
		page: page,
		limit: 20,
	});

	const { data: users = [], pagination } = data || {};

	const changeSection = (value) => {
		const params = new URLSearchParams(searchParams);

		params.set('status', value);
		params.set('page', 1);

		setSearchParams(params);
	};

	const handleSearch = () => {
		const params = new URLSearchParams(searchParams);

		if (searchValue) {
			params.set('paymentId', searchValue);
		} else {
			params.delete('paymentId');
		}

		params.set('page', 1);

		setSearchParams(params);
	};

	const flipPage = (p) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', p);
		setSearchParams(params);
	};

	const modalRef = useRef(null);
	const openModal = () => modalRef.current?.open();
	const closeModal = () => modalRef.current?.close();

	return (
		<Container>
			<h1>User Management</h1>

			<div id="nav_tab" className="bg-[var(--mainBody-background)]">
				<Search className="search_word" $useBackground>
					<button type="button" className="mr-[8px]" onClick={handleSearch}>
						<i className="text-[20px]">
							<CiSearch />
						</i>
					</button>
					<input
						className="search_word"
						type="text"
						name="MySearch"
						id="MySearch"
						placeholder="Search By ID"
						autoComplete="true"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleSearch();
						}}
					/>
				</Search>

				<div className="flex gap-[10px] items-center">
					<SearchBtn>
						<div className="content">
							<i>
								<FaUserPlus />
							</i>{' '}
							admin
						</div>
						<div className="loader"></div>
					</SearchBtn>
				</div>
			</div>

			<TabNav>
				<div id="NavWrapper">
					<OptionBtn
						$active={section === roleType.SUPER_ADMIN}
						onClick={() => changeSection(roleType.SUPER_ADMIN)}
						className="tabs"
					>
						<FaUserTie />
						Super Admin
					</OptionBtn>

					<OptionBtn
						$active={section === roleType.ADMIN}
						onClick={() => changeSection(roleType.ADMIN)}
						className="tabs"
					>
						<RiAdminLine />
						Admin
					</OptionBtn>

					<OptionBtn
						$active={section === roleType.BASIC}
						onClick={() => changeSection(roleType.BASIC)}
						className="tabs"
					>
						<FaUser />
						User
					</OptionBtn>
				</div>
			</TabNav>

			<TableWrapper>
				<CustomTable
					fields={[
						{
							Header: () => 'Name',
							accessor: 'name',
							Cell: ({ value }) => (
								<span className="nowrap font-medium">{value}</span>
							),
						},

						{
							Header: () => 'User Email',
							accessor: 'email',
							Cell: ({ value }) => <span className="nowrap">{value}</span>,
						},
						{
							Header: () => 'Role',
							accessor: 'role',
							Cell: ({ value }) => <span className="nowrap">{value}</span>,
						},
						{
							Header: () => 'Phone Number',
							accessor: 'phoneNumber',
							Cell: ({ value }) => (
								<span className="nowrap">{value?.number}</span>
							),
						},
						{
							Header: () => 'Date',
							accessor: 'createdAt',
							Cell: ({ value }) => (
								<span className="nowrap">
									{new Date(value).toLocaleDateString()}
								</span>
							),
						},

						{
							Header: () => <span>Manage Role</span>,
							accessor: 'role',
							Cell: ({ row }) => (
								<button
									className="px-[10px] py-[5px] text-xs font-semibold rounded-md transition-all ml-[10px]"
									style={{
										background: 'var(--mainBody-toolkitBg)',
									}}
									onClick={() => {}}
								>
									<div className="flex items-center gap-[5px]">Change Role</div>
								</button>
							),
						},
					]}
					dataSource={users || []}
					emptyIcon={
						<NoDataIcon
							width="150px"
							height="150px"
							color="var(--mainBody-sbText)"
						/>
					}
					emptyText="NO ITEMS YET"
					emptySbText="There is no available data to show. Please try something else"
					refetch={refetch}
					isLoading={isPending}
					currentPage={page}
					totalPages={pagination?.totalPages || 1}
					changePage={flipPage}
					useStrip
					onDoubleCallRow={(data) =>
						navigate(`/admin/orders?paymentId=${data?._id}&currentSection=`)
					}
				/>
			</TableWrapper>
		</Container>
	);
}

export default Index;
