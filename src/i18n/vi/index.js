import { sign } from '../vi/sign';
import {home} from './home';
import {setting} from './setting';

export const viTrans = {
	...home,
	...setting,
	...sign
}