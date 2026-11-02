import { IditenaEntityBase } from '../IditenaEntityBase';
import type { IditenaSDK } from '../IditenaSDK';
import type { Control } from '../types';
import type { FinderIndex, FinderIndexListMatch } from '../IditenaTypes';
declare class FinderIndexEntity extends IditenaEntityBase<FinderIndex> {
    constructor(client: IditenaSDK, entopts: any);
    make(this: FinderIndexEntity): FinderIndexEntity;
    list(this: any, reqmatch?: FinderIndexListMatch, ctrl?: Control): Promise<FinderIndexEntity[]>;
}
export { FinderIndexEntity };
