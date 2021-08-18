import { SAVE_DONE_POMO, INC_DONE_POMO } from "../constants/taskConstants"


export const saveDonePomo = (donePomo) => {
	return {type: SAVE_DONE_POMO, payload: donePomo};
}

export const incDonePomo = () => {
	return {type: INC_DONE_POMO};
}
