import { IditenaEntityBase } from '../IditenaEntityBase';
import type { IditenaSDK } from '../IditenaSDK';
import type { Control } from '../types';
import type { VisitorReport, VisitorReportLoadMatch } from '../IditenaTypes';
declare class VisitorReportEntity extends IditenaEntityBase<VisitorReport> {
    constructor(client: IditenaSDK, entopts: any);
    make(this: VisitorReportEntity): VisitorReportEntity;
    load(this: any, reqmatch?: VisitorReportLoadMatch, ctrl?: Control): Promise<VisitorReportEntity>;
}
export { VisitorReportEntity };
