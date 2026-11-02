import { IditenaEntityBase } from '../IditenaEntityBase';
import type { IditenaSDK } from '../IditenaSDK';
import type { Control } from '../types';
import type { DistrictResult, DistrictResultListMatch } from '../IditenaTypes';
declare class DistrictResultEntity extends IditenaEntityBase<DistrictResult> {
    constructor(client: IditenaSDK, entopts: any);
    make(this: DistrictResultEntity): DistrictResultEntity;
    list(this: any, reqmatch?: DistrictResultListMatch, ctrl?: Control): Promise<DistrictResultEntity[]>;
}
export { DistrictResultEntity };
