export const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

export const PARTICIPANT_TYPES = [
  { value: 'single', label: 'Single' },
  { value: 'facilitator', label: 'Facilitator' },
  { value: 'minister', label: 'Minister' },
  { value: 'guest', label: 'Guest' },
]

export const TITLES = [
  { value: 'mr', label: 'Mr' },
  { value: 'mrs', label: 'Mrs' },
  { value: 'miss', label: 'Miss' },
  { value: 'dr', label: 'Dr' },
  { value: 'rev', label: 'Rev' },
  { value: 'ps', label: 'Ps' },
  { value: 'elder', label: 'Elder' },
  { value: 'deacon', label: 'Deacon' },
  { value: 'deaconess', label: 'Deaconess' },
]

export const DESIGNATIONS = [
  { value: 'member', label: 'Member' },
  { value: 'local_elder', label: 'Local Elder' },
  { value: 'district_elder', label: 'District Elder' },
  { value: 'deacon', label: 'Deacon' },
  { value: 'deaconess', label: 'Deaconess' },
  { value: 'minister', label: 'Minister' },
  { value: 'district_minister', label: 'District Minister' },
  { value: 'area_head', label: 'Area Head' },
  { value: 'other', label: 'Other' },
]

export const VENUES = [
  {
    value: 'STATION_CENTRAL',
    label: 'Station Central',
    description: 'Station Central, Assin Fosu',
  },
]

export const REGISTRATION_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export const CONFERENCE = {
  name: 'Singles Connect Conference 2026',
  area: 'Assin Fosu Area',
  church: 'The Church of Pentecost',
  year: '2026',
  startDate: 'Monday, 4th May 2026',
  endDate: 'Monday, 4th May 2026',
  dateShort: 'MON 4TH MAY 2026',
  startDateISO: '2026-05-04T00:00:00',
  refPrefix: 'SCC2026',
  theme: 'Love, Singleness and Marriage',
  scripture: '1 Corinthians 7:6-9, Genesis 2:18',
  disclaimer: 'For persons aged 21 years and above',
  venue: 'Station Central, Assin Fosu',
  conferencePackage: ['Refreshments', 'Conference Souvenirs', 'Networking & Fellowship'],
  conferenceRate: 'FREE',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://singles-connect.vercel.app',
  flyerUrl: '/images/singles-connect-conference-2026-flyer.png',
}
