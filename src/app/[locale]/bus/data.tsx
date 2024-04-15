type stop_id = number;

/**
 * Represents a bus route.
 */
export interface BusRouteType {
  route_id: number;
  name: string;
  bgColor: string;
  serviceHours: string;
  departureTime: number[];
  isWeekdayOnly: boolean;
  stops: stop_id[];
}

/**
 * Represents all routes.
 */
export const BusRoutes: BusRouteType[] = [
  {
    route_id: 1,
    name: "1A",
    bgColor: "linear-gradient(to right, #ffd700, #ff8000)",
    serviceHours: "07:00 - 18:40",
    departureTime: [20, 40],
    isWeekdayOnly: true,
    stops: [1, 2, 3, 4, 5, 6],
  },
  {
    route_id: 100,
    name: "1B",
    bgColor: "linear-gradient(to right, #ffd700, #ff8000)",
    serviceHours: "08:00 - 18:00",
    departureTime: [0],
    isWeekdayOnly: true,
    stops: [1, 2, 3, 4, 5, 6],
  },
  {
    route_id: 2,
    name: "2",
    bgColor: "linear-gradient(to right, #ff0000, #ff1493)",
    serviceHours: "07:45 - 18:45",
    departureTime: [0, 15, 30, 45],
    isWeekdayOnly: true,
    stops: [1, 2, 3, 6],
  },
  {
    route_id: 3,
    name: "3",
    bgColor: "linear-gradient(to right, #008000, #00FF00)",
    serviceHours: "09:00 - 18:40",
    departureTime: [0, 15, 30, 45],
    isWeekdayOnly: true,
    stops: [1, 2, 3],
  },
  {
    route_id: 4,
    name: "4",
    bgColor: "linear-gradient(to right, #ff0000, #ff8000)",
    serviceHours: "07:40 - 18:40",
    departureTime: [0, 20, 40],
    isWeekdayOnly: true,
    stops: [1, 2],
  },
  {
    route_id: 5,
    name: "5",
    bgColor: "linear-gradient(to right, #add8e6, #87cefa)", // light blue gradient
    serviceHours: "09:18 - 17:26",
    departureTime: [18, 22, 26],
    isWeekdayOnly: true,
    stops: [1, 2],
  },
  {
    route_id: 6,
    name: "6A",
    bgColor: "linear-gradient(to right, #d2b48c, #8b4513)", // tea color gradient
    serviceHours: "09:10 - 17:10",
    departureTime: [10],
    isWeekdayOnly: true,
    stops: [1, 2],
  },
  {
    route_id: 99,
    name: "6B",
    bgColor: "linear-gradient(to right, #00008b, #0000cd)", // dark blue gradient
    serviceHours: "12:20 - 17:20",
    departureTime: [20],
    isWeekdayOnly: true,
    stops: [1, 2],
  },
  {
    route_id: 7,
    name: "7",
    bgColor: "linear-gradient(to right, #808080, #a9a9a9)", // gray gradient
    serviceHours: "08:18 - 17:50",
    departureTime: [18, 50],
    isWeekdayOnly: true,
    stops: [1, 2],
  },
  {
    route_id: 8,
    name: "8",
    bgColor: "linear-gradient(to right, #fff060, 	#f0c200)",
    serviceHours: "07:45 - 18:40",
    departureTime: [0, 20, 40],
    isWeekdayOnly: true,
    stops: [1, 2],
  },
  {
    route_id: 9,
    name: "N",
    bgColor: "linear-gradient(to right, #800080, #9932CC)",

    serviceHours: "19:00 - 23:30",
    departureTime: [0, 15, 30, 45],
    isWeekdayOnly: true,
    stops: [1, 2],
  },
  {
    route_id: 10,
    name: "H",
    bgColor: "linear-gradient(to right, #800080, #e066ff)",
    serviceHours: "08:20 - 23:20",
    departureTime: [0, 20, 40],
    isWeekdayOnly: false,
    stops: [1, 2],
  },
];

/**
 * Represents a bus stop.
 */
export interface BusStopType {
  stop_id: stop_id;
  name: string;
  imageUrl?: string;
  location: { lat: number; lng: number };
}

/**
 * Represents a list of bus stops.
 */
export const BusStops: BusStopType[] = [
  {
    stop_id: 1,
    name: "University Station Up",
    imageUrl: "/BusStops/UniversityStationUp.png",
    location: { lat: 22.41451, lng: 114.210207 },
  },
  {
    stop_id: 2,
    name: "University Sport Centre",
    imageUrl: "/BusStops/UniversitySportCentre.png",
    location: { lat: 22.417814, lng: 114.210501 },
  },
  {
    stop_id: 3,
    name: "Sir Run Run Shaw Hall",
    imageUrl: "/BusStops/SirRunRunShawHall.png",
    location: { lat: 22.419854, lng: 114.206968 },
  },
  {
    stop_id: 4,
    name: "University Administration Building",
    imageUrl: "/BusStops/UniversityAdministrationBuilding.png",
    location: { lat: 22.418795, lng: 114.205293 },
  },
  {
    stop_id: 5,
    name: "SHHO College",
    imageUrl: "/BusStops/SHHOCollage.png",
    location: { lat: 22.417993, lng: 114.209918 },
  },
  {
    stop_id: 6,
    name: "University Station Down",
    imageUrl: "/BusStops/UniversityStationDown.png",
    location: { lat: 22.415155, lng: 114.210485 },
  },
];

/**
 * Represents the path between two bus stops.
 */
export interface BusStopsPathType {
  path_id: number;
  desc: string;
  departure: stop_id;
  destination: stop_id;
  path: { lat: number; lng: number }[];
}

/**
 * Represents a list of bus stop paths.
 */
export const BusStopsPath: BusStopsPathType[] = [
  {
    path_id: 1,
    desc: "University Station Up to University Gym",
    departure: 1,
    destination: 2,
    path: [
      { lat: 22.41451, lng: 114.210207 },
      { lat: 22.414527, lng: 114.210176 },
      { lat: 22.414387, lng: 114.210085 },
      { lat: 22.414376, lng: 114.210044 },
      { lat: 22.414382, lng: 114.210001 },
      { lat: 22.414406, lng: 114.209971 },
      { lat: 22.414446, lng: 114.209958 },
      { lat: 22.414489, lng: 114.20996 },
      { lat: 22.41452, lng: 114.209987 },
      { lat: 22.414537, lng: 114.210022 },
      { lat: 22.414542, lng: 114.210056 },
      { lat: 22.414581, lng: 114.210083 },
      { lat: 22.415085, lng: 114.210374 },
      { lat: 22.415466, lng: 114.210625 },
      { lat: 22.41582, lng: 114.210993 },
      { lat: 22.416686, lng: 114.211902 },
      { lat: 22.417112, lng: 114.212318 },
      { lat: 22.417226, lng: 114.212344 },
      { lat: 22.417325, lng: 114.21236 },
      { lat: 22.41742, lng: 114.212326 },
      { lat: 22.417508, lng: 114.21228 },
      { lat: 22.417577, lng: 114.212229 },
      { lat: 22.4176, lng: 114.212105 },
      { lat: 22.41762, lng: 114.211982 },
      { lat: 22.41763, lng: 114.211836 },
      { lat: 22.417608, lng: 114.211538 },
      { lat: 22.417814, lng: 114.210501 },
    ],
  },
  {
    path_id: 2,
    desc: "University Sport Centre to Sir Run Run Shaw Hall",
    departure: 2,
    destination: 3,
    path: [
      { lat: 22.417814, lng: 114.210501 },
      { lat: 22.417846, lng: 114.21039 },
      { lat: 22.417987, lng: 114.209757 },
      { lat: 22.418166, lng: 114.209322 },
      { lat: 22.418325, lng: 114.208957 },
      { lat: 22.418524, lng: 114.208665 },
      { lat: 22.418591, lng: 114.208544 },
      { lat: 22.418598, lng: 114.208469 },
      { lat: 22.418588, lng: 114.208407 },
      { lat: 22.418551, lng: 114.20827 },
      { lat: 22.418491, lng: 114.208007 },
      { lat: 22.418494, lng: 114.207975 },
      { lat: 22.418526, lng: 114.207967 },
      { lat: 22.418576, lng: 114.207975 },
      { lat: 22.4187, lng: 114.207988 },
      { lat: 22.418724, lng: 114.208021 },
      { lat: 22.418744, lng: 114.208053 },
      { lat: 22.418754, lng: 114.208112 },
      { lat: 22.418759, lng: 114.208171 },
      { lat: 22.418785, lng: 114.20842 },
      { lat: 22.418832, lng: 114.208734 },
      { lat: 22.418855, lng: 114.208817 },
      { lat: 22.418941, lng: 114.208954 },
      { lat: 22.419043, lng: 114.209051 },
      { lat: 22.419202, lng: 114.209145 },
      { lat: 22.419373, lng: 114.20923 },
      { lat: 22.419509, lng: 114.209273 },
      { lat: 22.419588, lng: 114.209252 },
      { lat: 22.419625, lng: 114.209201 },
      { lat: 22.41965, lng: 114.209118 },
      { lat: 22.419647, lng: 114.20904 },
      { lat: 22.41965, lng: 114.208943 },
      { lat: 22.41967, lng: 114.208866 },
      { lat: 22.419697, lng: 114.208801 },
      { lat: 22.419739, lng: 114.208737 },
      { lat: 22.419831, lng: 114.208599 },
      { lat: 22.419856, lng: 114.208508 },
      { lat: 22.419851, lng: 114.208291 },
      { lat: 22.419849, lng: 114.207717 },
      { lat: 22.419856, lng: 114.207387 },
      { lat: 22.419854, lng: 114.206968 },
    ],
  },
  {
    path_id: 3,
    desc: "Sir Run Run Shaw Hall to University Administration Building",
    departure: 3,
    destination: 4,
    path: [
      { lat: 22.419854, lng: 114.206968 },
      { lat: 22.419861, lng: 114.20589 },
      { lat: 22.419866, lng: 114.205228 },
      { lat: 22.419858, lng: 114.204734 },
      { lat: 22.419851, lng: 114.204399 },
      { lat: 22.419841, lng: 114.20438 },
      { lat: 22.419831, lng: 114.204367 },
      { lat: 22.419816, lng: 114.204364 },
      { lat: 22.419794, lng: 114.204364 },
      { lat: 22.419487, lng: 114.204351 },
      { lat: 22.419214, lng: 114.20434 },
      { lat: 22.418828, lng: 114.204344 },
      { lat: 22.418801, lng: 114.20435 },
      { lat: 22.418791, lng: 114.204366 },
      { lat: 22.418784, lng: 114.204387 },
      { lat: 22.418781, lng: 114.204411 },
      { lat: 22.418798, lng: 114.204866 },
      { lat: 22.418795, lng: 114.205293 },
    ],
  },
  {
    path_id: 4,
    desc: "University Administration Building to SHHO College",
    departure: 4,
    destination: 5,
    path: [
      { lat: 22.418795, lng: 114.205293 },
      { lat: 22.418753, lng: 114.205606 },
      { lat: 22.418651, lng: 114.206065 },
      { lat: 22.418594, lng: 114.206567 },
      { lat: 22.418515, lng: 114.207248 },
      { lat: 22.418498, lng: 114.20776 },
      { lat: 22.418532, lng: 114.208012 },
      { lat: 22.418594, lng: 114.208258 },
      { lat: 22.418629, lng: 114.208484 },
      { lat: 22.418604, lng: 114.208586 },
      { lat: 22.418549, lng: 114.208672 },
      { lat: 22.418488, lng: 114.208768 },
      { lat: 22.418406, lng: 114.208913 },
      { lat: 22.418356, lng: 114.208991 },
      { lat: 22.418279, lng: 114.209178 },
      { lat: 22.418232, lng: 114.20929 },
      { lat: 22.418169, lng: 114.209433 },
      { lat: 22.418117, lng: 114.20954 },
      { lat: 22.41806, lng: 114.209677 },
      { lat: 22.418005, lng: 114.209867 },
      { lat: 22.417993, lng: 114.209918 },
    ],
  },
  {
    path_id: 5,
    desc: "SHHO College to University Station Down",
    departure: 5,
    destination: 6,
    path: [
      { lat: 22.417993, lng: 114.209918 },
      { lat: 22.417862, lng: 114.210566 },
      { lat: 22.417733, lng: 114.211132 },
      { lat: 22.417646, lng: 114.211651 },
      { lat: 22.417611, lng: 114.212153 },
      { lat: 22.417594, lng: 114.212242 },
      { lat: 22.417629, lng: 114.212287 },
      { lat: 22.417634, lng: 114.21233 },
      { lat: 22.417621, lng: 114.212371 },
      { lat: 22.417604, lng: 114.212408 },
      { lat: 22.417581, lng: 114.212419 },
      { lat: 22.417547, lng: 114.212424 },
      { lat: 22.417514, lng: 114.212414 },
      { lat: 22.417497, lng: 114.212381 },
      { lat: 22.417485, lng: 114.21236 },
      { lat: 22.41745, lng: 114.212333 },
      { lat: 22.4174, lng: 114.212344 },
      { lat: 22.417325, lng: 114.212355 },
      { lat: 22.417266, lng: 114.212352 },
      { lat: 22.417201, lng: 114.212336 },
      { lat: 22.417132, lng: 114.212312 },
      { lat: 22.417072, lng: 114.212282 },
      { lat: 22.417003, lng: 114.212234 },
      { lat: 22.416953, lng: 114.212183 },
      { lat: 22.416909, lng: 114.212135 },
      { lat: 22.416085, lng: 114.211298 },
      { lat: 22.415795, lng: 114.211017 },
      { lat: 22.415589, lng: 114.210784 },
      { lat: 22.41548, lng: 114.210676 },
      { lat: 22.415386, lng: 114.210596 },
      { lat: 22.415353, lng: 114.210573 },
      { lat: 22.415318, lng: 114.210554 },
      { lat: 22.415229, lng: 114.210509 },
      { lat: 22.415155, lng: 114.210485 },
    ],
  },
];
