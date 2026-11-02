import { IditenaEntityBase } from '../IditenaEntityBase';
import type { IditenaSDK } from '../IditenaSDK';
import type { Control } from '../types';
import type { UikIndex, UikIndexListMatch } from '../IditenaTypes';
declare class UikIndexEntity extends IditenaEntityBase<UikIndex> {
    constructor(client: IditenaSDK, entopts: any);
    make(this: UikIndexEntity): UikIndexEntity;
    list(this: any, reqmatch?: UikIndexListMatch, ctrl?: Control): Promise<UikIndexEntity[]>;
}
export { UikIndexEntity };
