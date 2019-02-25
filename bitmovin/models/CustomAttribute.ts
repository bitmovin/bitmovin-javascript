
/**
 * @export
 * @interface CustomAttribute
 */
export default interface CustomAttribute {
    /**
     * unique string identifier for the custom attribute
     * @type {string}
     * @memberof CustomAttribute
     */
    key: string;

    /**
     * value of the custom attribute
     * @type {string}
     * @memberof CustomAttribute
     */
    value?: string;

}
