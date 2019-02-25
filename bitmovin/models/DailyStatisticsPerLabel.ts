import DailyStatistics from './DailyStatistics';

/**
 * @export
 * @interface DailyStatisticsPerLabel
 */
export default interface DailyStatisticsPerLabel {
    /**
     * Date, format. yyyy-MM-dd
     * @type {Date}
     * @memberof DailyStatisticsPerLabel
     */
    date: Date;

    /**
     * List of labels and their aggregated statistics
     * @type {Array<DailyStatistics>}
     * @memberof DailyStatisticsPerLabel
     */
    labels: Array<DailyStatistics>;

}
