/* eslint-disable @typescript-eslint/naming-convention */
import { EXTENSION_CONSTANT } from 'constant';
function Button(){
    return (
        <><><><button id={EXTENSION_CONSTANT.ELEMENT_IDS.TRIGGER_MESSAGE_BUTTON}>
            Click to show message
        </button><button id={EXTENSION_CONSTANT.ELEMENT_IDS.TRIGGER_DAILY_BUTTON}>
                Click to show daily contrubtions
            </button></><button id={EXTENSION_CONSTANT.ELEMENT_IDS.TRIGGER_WEEKLY_BUTTON}>
                Click to show weekly contrubtions
            </button></><button id={EXTENSION_CONSTANT.ELEMENT_IDS.TRIGGER_MONTHLY_BUTTON}>
                Click to show monthly contrubtions
            </button></>
    );
}

export default Button;