import { DistrictResultEntity } from './entity/DistrictResultEntity';
import { FinderIndexEntity } from './entity/FinderIndexEntity';
import { UikIndexEntity } from './entity/UikIndexEntity';
import { UikRegionEntity } from './entity/UikRegionEntity';
import { VisitorReportEntity } from './entity/VisitorReportEntity';
export type * from './IditenaTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { IditenaEntityBase } from './IditenaEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class IditenaSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    DistrictResult(entopts?: Record<string, any>): DistrictResultEntity;
    FinderIndex(entopts?: Record<string, any>): FinderIndexEntity;
    UikIndex(entopts?: Record<string, any>): UikIndexEntity;
    UikRegion(entopts?: Record<string, any>): UikRegionEntity;
    VisitorReport(entopts?: Record<string, any>): VisitorReportEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): IditenaSDK;
    tester(testopts?: any, sdkopts?: any): IditenaSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof IditenaSDK;
export { stdutil, config, BaseFeature, IditenaEntityBase, IditenaSDK, SDK, };
export type { DirectResult };
