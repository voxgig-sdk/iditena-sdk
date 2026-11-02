import { IditenaEntityBase } from '../IditenaEntityBase';
import type { IditenaSDK } from '../IditenaSDK';
import type { Control } from '../types';
import type { UikRegion, UikRegionListMatch } from '../IditenaTypes';
declare class UikRegionEntity extends IditenaEntityBase<UikRegion> {
    constructor(client: IditenaSDK, entopts: any);
    make(this: UikRegionEntity): UikRegionEntity;
    list(this: any, reqmatch?: UikRegionListMatch, ctrl?: Control): Promise<UikRegionEntity[]>;
}
export { UikRegionEntity };
