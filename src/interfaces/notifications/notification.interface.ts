export default interface INotification {
	_id?: string;
	receiverId: string;
	title?: string;
	message: string;
	new?: boolean;
	link: string;
	createdAt?: string;
}
