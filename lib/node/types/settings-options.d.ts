import { BorderOptions, Options } from '../utils/options';
import { RecursivePartial } from './helper';
import { StyleOptions } from './style-options';
import { TextOptions } from './text-options';
export interface SettingsOptions {
    id?: string;
    name?: string;
    description?: string;
    metadata?: Record<string, any>;
    data?: string;
    image?: string;
    template?: string | RecursivePartial<Options>;
    templateId?: string;
    style?: string | StyleOptions;
    styleId?: string;
    text?: string | TextOptions;
    textId?: string;
    border?: string | RecursivePartial<BorderOptions>;
    borderId?: string;
    options?: RecursivePartial<Options>;
}
