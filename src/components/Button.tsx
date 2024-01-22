/* eslint-disable @typescript-eslint/naming-convention */
import { EXTENSION_CONSTANT } from 'constant';
function Button(){
    return (
        <><><><button id={EXTENSION_CONSTANT.ELEMENT_IDS.TRIGGER_MESSAGE_BUTTON}>
            Click to show All-time contributions
        </button><button id={EXTENSION_CONSTANT.ELEMENT_IDS.TRIGGER_DAILY_BUTTON}>
                Click to show contributions today
            </button></><button id={EXTENSION_CONSTANT.ELEMENT_IDS.TRIGGER_WEEKLY_BUTTON}>
                Click to show contrubtions past week
            </button></><button id={EXTENSION_CONSTANT.ELEMENT_IDS.TRIGGER_MONTHLY_BUTTON}>
                Click to show contrubtions past month
            </button></>
    );
}

export default Button;