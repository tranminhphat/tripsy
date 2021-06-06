const convertTimestampToDate = (timestamp: string) => {
	const d = new Date(timestamp);
	const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
	return date;
};

export default convertTimestampToDate;
