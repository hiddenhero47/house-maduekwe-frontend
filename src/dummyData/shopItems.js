import GreenImage from './imageData/green.avif';
import GreenImage2 from './imageData/green2.avif';
import BlackImage from './imageData/black.avif';
import BlackImage2 from './imageData/black2.avif';
import RedImage from './imageData/red.avif';
import RedImage2 from './imageData/red2.avif';

const description = `
Cool and suitable for that classy casual look. You can wear this withjeans/chinos and sneakers. 
Stand out,look sharp. With the sizes , you have more options to choose from and at a pocket friendly budget. 100% cotton. 
This is driven by the desire to provide our customers with quality and affordable clothing and accessories. 
This package contains round neck short sleeve t-shirt, made from the best cotton fabric, 
tailored by one of the best in the business to give you that sharp casual look at a pocket friendly budget.
`;

const imageCatalog = [
	{
		id: '264c5785-d024-4b6a-b139-bb06a4622c2c',
		fileName: 'green.avif',
		path: '',
		url: GreenImage,
		mime: 'image/avif',
	},
	{
		id: '7bf58d4d-dd5b-4244-a8c5-6f51f0156c36',
		fileName: 'green2.avif',
		path: '',
		url: GreenImage2,
		mime: 'image/avif',
	},
	{
		id: '9e668d4f-e67e-49c7-ba3c-fccf26274f1a',
		fileName: 'black.avif',
		path: '',
		url: BlackImage,
		mime: 'image/avif',
	},

	{
		id: 'b2a4f1e9-8c5a-44b7-90b3-0a8b2e3c17b2',
		fileName: 'black2.avif',
		path: '',
		url: BlackImage2,
		mime: 'image/avif',
	},
	{
		id: '3eac75c0-5f49-4db2-bf2b-3b8f815bcb9e',
		fileName: 'red.avif',
		path: '',
		url: RedImage,
		mime: 'image/avif',
	},
	{
		id: 'd9174c61-0e36-48e1-a83d-6f84b00b7f3e',
		fileName: 'red2.avif',
		path: '',
		url: RedImage2,
		mime: 'image/avif',
	},
];

const attributes = [
	{
		Attribute: {
			_id: '68fe990fec7392bb96d44c42',
			name: 'dark green',
			value: '#5b594f',
			type: 'color',
			display: '#5b594f',
		},
		isDefault: false,
		images: [imageCatalog[0], imageCatalog[1]],
		_id: '69012f90db250f428e6eb506',
	},
	{
		Attribute: {
			_id: '68fe99abec7392bb96d44c45',
			name: 'black',
			value: '#1c1820',
			type: 'color',
			display: '#1c1820',
		},
		isDefault: false,
		images: [imageCatalog[2], imageCatalog[3]],
		_id: '69012f90db250f428e6eb506',
	},
	{
		Attribute: {
			_id: '68fe9a67ec7392bb96d44c48',
			name: 'dark muted red',
			value: '#532829',
			type: 'color',
			display: '#532829',
		},
		isDefault: false,
		images: [imageCatalog[4], imageCatalog[5]],
		_id: '69012f90db250f428e6eb506',
	},
	{
		Attribute: {
			_id: '6900d47ea716ddc39de4b1a4',
			name: 'US-Size',
			value: '1',
			type: 'size',
			display: 'S',
		},
		isDefault: false,
		images: [],
		_id: '69012f90db250f428e6eb507',
	},
	{
		Attribute: {
			_id: '6900d4b7a716ddc39de4b1a7',
			name: 'US-Size',
			value: '2',
			type: 'size',
			display: 'M',
		},
		isDefault: false,
		images: [],
		_id: '69012f90db250f428e6eb507',
	},

	{
		Attribute: {
			_id: '6900d4c5a716ddc39de4b1aa',
			name: 'US-Size',
			value: '3',
			type: 'size',
			display: 'L',
		},
		isDefault: false,
		images: [],
		_id: '69012f90db250f428e6eb507',
	},

	{
		Attribute: {
			_id: '6900d4dfa716ddc39de4b1ad',
			name: 'US-Size',
			value: '4',
			type: 'size',
			display: 'XL',
		},
		isDefault: false,
		images: [],
		_id: '69012f90db250f428e6eb507',
	},
];

export const items = [
	{
		_id: '69011fbce75b937930afd8b4',
		name: 'Slim Fit Polo Shirt',
		brand: 'Fashion Elite',
		status: 'available',
		description: description,
		price: 39.99,
		vat: 8,
		currency: 'USD',
		category: {
			_id: '68feafda74fd960f2696747c',
			name: 'fashion',
		},
		subCategory: 'T-Shirt',
		quantity: 10,
		imageCatalog: imageCatalog,
		discount: 0,
		attributes: attributes,
		futures: [
			'Only the best materials',
			'Ethically and locally made',
			'Pre-washed and pre-shrunk',
			'Machine wash cold with similar colors',
		],
		createdAt: '2025-10-28T19:55:40.596Z',
		updatedAt: '2025-10-28T21:03:12.064Z',
		__v: 0,
	},
];
