interface About {
	eTag: string;
	schemaVersion: string;
	server: string;
	serverVersion: string;
	serverTimeStamp: string;
}

interface Timeslot {
	label: string;
	startTime: string;
	endTime: string;
	color: string;
}

interface Timeframe {
	code: string;
	timeslotFragmentation: number;
	timeslots: Timeslot[];
}

interface Session {
	startDate: string;
	endDate: string;
}

interface Effectivity {
	startDate: string;
	endDate: string;
}

interface Weekspan {
	weekdayStart: number;
	weekdayEnd: number;
}

interface Display {
	posLabel: number;
	lessonColor: number;
	lessonGradient: number;
	alwaysLessonTime: number;
	absenceReasons: number;
	absReasonCaption: number;
	lessonLayout: number;
	lessonWeeks: string;
	publishDays: number;
	publishSubstMessage: boolean;
	backgroundColor: string;
	eventColor: string;
	supervisionColor: string;
	supervisionChangeColor: string;
	lessonChangeColor: string;
	headerBgColor: string;
	roomChangeColor: string;
	messageColor: string;
	additionalLessonColor: string;
	absenceColor: string;
	todayColor: string;
	todayHeaderColor: string;
}

interface Changes {
	caption: string;
	changeType: number;
	information: string;
	modified: string;
	newRoomCodes: string[];
	absentRoomCodes: string[];
	lessonTitle: string;
	message: string;
	absentTeacherCodes: string[];
}

export interface LessonTime {
	dates: string[];
	startTime: string;
	endTime: string;
	teacherCodes: string[];
	roomCodes: string[];
	buildingCodes: string[];
	changes: Changes;
	courseTitle: string;
	lessonRef: string;
	courseRef: string;
	subjectCode: string;
	classCodes?: string[];
	lessonBlock: string;
	courseDescription: string;
}

interface EventTime {
	eventRef: string;
	startDate: string;
	startTime: string;
	endDate: string;
	endTime: string;
	eventCaption: string;
	eventStatus: number;
	noLessons: boolean;
	wholeDay: boolean;
}

interface DisplaySchedule {
	scheduleID: string;
	scheduleDescription: string;
	session: Session;
	effectivity: Effectivity;
	weekspan: Weekspan;
	display: Display;
	lessonTimes: LessonTime[];
	supervisionTimes: any[];
	eventTimes: EventTime[];
}

interface TeacherAbsence {
	id: string;
	startDate: string;
	startTime: string;
	endDate: string;
	endTime: string;
	teacherRef: string;
	note: string;
}

interface Cours {
	id: string;
	description: string;
	title: string;
	subjectRef: string;
	remarks: string;
	url: string;
}

interface Teacher {
	id: string;
	code: string;
	firstName: string;
	lastName: string;
	teamRefs: string[];
}

interface Room {
	id: string;
	code: string;
	description: string;
	buildingRef: string;
	teamRefs: string[];
}

interface Subject {
	id: string;
	code: string;
	description: string;
	color: string;
}

interface Team {
	id: string;
	code: string;
	description: string;
}

interface Resource {
	id: string;
	code: string;
	description: string;
	color: string;
}

interface Building {
	id: string;
	code: string;
	description: string;
}

interface Class {
	id: string;
	code: string;
	description: string;
	color: string;
	teamRefs: string[];
}

export interface Result {
	teacherAbsenceReasons: any[];
	classAbsenceReasons: any[];
	roomAbsenceReasons: any[];
	timeframes: Timeframe[];
	firstLesson: Date;
	displaySchedule: DisplaySchedule;
	classAbsences: any[];
	roomAbsences: any[];
	teacherAbsences: TeacherAbsence[];
	courses: Cours[];
	teachers: Teacher[];
	rooms: Room[];
	subjects: Subject[];
	teams: Team[];
	resources: Resource[];
	buildings: Building[];
	classes: Class[];
}

interface User {
	profile: string;
	policy: number;
	logbutton: boolean;
}

export default interface Response {
	about: About;
	result: Result;
	user: User;
}
