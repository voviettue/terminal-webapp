// type
import { TableHeader } from '~~/shared/types'
export const listHeader: TableHeader[] = [
	{ value: 'catalog_id', text: 'Deal ID' },
	{ value: 'catalog_name', text: 'Deal name' },
	{
		value: 'percentage_purchased',
		text: 'Percentage purchased',
		display: 'percent',
	},
	{ value: 'number_of_songs', text: 'Number of Songs' },
	{
		value: 'hipgnosis_fund',
		text: 'Hipgnosis Fund',
	},
	{
		value: 'acquisition_date',
		text: 'Acquisition Date',
		display: 'date',
		displayOptions: {
			format: 'PPP',
		},
	},
	{
		value: 'catalog_status',
		text: 'Status',
	},
]

export const contactHeader: TableHeader[] = [
	{ value: 'contact_name', text: 'Name' },
	{ value: 'contact_role', text: 'Role' },
	{ value: 'phone_number', text: 'Phone' },
	{ value: 'email', text: 'Email' },
]
export const docHeader: TableHeader[] = [
	{ value: 'title', text: 'Name' },
	{ value: 'description', text: 'Description' },
	{
		value: 'updateAt',
		text: 'Last Updated',
		display: 'date',
		displayOptions: {
			format: 'PPP',
		},
	},
	{ value: 'attact', text: 'File' },
]
export const dealHeader: TableHeader[] = [
	{ value: 'deal_id', text: 'Deal Number' },
	{ value: 'deal_name', text: 'Deal Name' },
	{
		value: 'type',
		text: 'Type',
	},
	{
		value: 'sub_type',
		text: 'Sup Type',
	},
	{ value: 'actions', text: 'View' },
]
export const dealInfoHeader: TableHeader[] = [
	{
		value: 'hipgnosis_fund',
		text: 'Hipgnosis Fund',
	},
	{
		value: 'hipgnosis_entity',
		text: 'Hipgnosis Entity',
	},
	{ value: 'catalog_id', text: 'Catalogue' },
	{
		text: 'Catalogue Name',
		value: 'catalog_name',
	},
	{ value: 'vendor_entities', text: 'Vendor Entity' },
	{
		value: 'acquisition_date',
		text: 'Acquisition Date',
		display: 'date',
		displayOptions: {
			format: 'PPP',
		},
	},
	{
		value: 'percentage_purchased',
		text: 'Percentage purchased',
		display: 'percent',
	},
	{ value: 'number_of_songs', text: 'Number of Songs' },
	{
		value: 'number_of_shared_songs',
		text: 'Number of shared songs with Acquisitions',
	},
]
export const rateHeader: TableHeader[] = [
	{
		value: 'publishing',
		text: 'Publishing ',
		display: 'percent',
	},
	{
		value: 'writer',
		text: 'Writers ',
		display: 'percent',
	},
	{
		value: 'neigbouring',
		text: 'Neigbouring Rights ',
		display: 'percent',
	},
	{
		value: 'master',
		text: 'Master Rights Share',
		display: 'percent',
	},
	{
		value: 'producer',
		text: 'Producer Rights ',
		display: 'percent',
	},
	{
		value: 'net',
		text: 'Net Publishing Rights  ',
		display: 'percent',
	},
	{
		value: 'movie',
		text: 'Movie Producer Rights ',
		display: 'percent',
	},
	{ text: 'Number of Songs', value: 'song' },
	{
		value: 'share',
		text: 'Number of shared songs with Acquisitions',
	},
]
