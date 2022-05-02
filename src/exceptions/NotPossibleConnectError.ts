export class NotPossibleConnectError extends Error {
	status: number = 0;
	constructor(public message: string) {
		super(message);
		this.name = "NotPossibleConnectError";
	}
	toString(): string {
		return `${this.name} : ${this.message}`;
	}
}