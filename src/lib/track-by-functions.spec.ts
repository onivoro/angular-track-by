import { trackByFunctions } from './track-by-functions';

describe('trackByFunctions', () => {
    let trackableObject: any;
    let arbitraryValue: any;

    beforeEach(() => {
        trackableObject = {};
        arbitraryValue = Math.floor(new Date().valueOf() * Math.random());
    });

    describe.each([
        ['byValue', 'value'],
        ['byKey', 'key'],
        ['byId', 'id'],
    ])('%s', (trackerName, trackableFieldName) => {
        describe(`GIVEN "${trackableFieldName}" is defined on the object being tracked`, () => {
            beforeEach(() => {
                trackableObject[trackableFieldName] = arbitraryValue;
            });

            it(`returns the corresponding value of the trackable object's "${trackableFieldName}" member`, () => {
                const trackBy = (trackByFunctions as any)[trackerName];
                expect(trackBy(null, trackableObject)).toEqual(arbitraryValue);
            });
        });
    });

    describe('byIndex', () => {
        it(`acts as an identity function and simply returns the first parameter`, () => {
            expect(trackByFunctions.byIndex(arbitraryValue)).toEqual(arbitraryValue);
        });
    });

    describe('by', () => {
        const trackableFieldName = 'whatever';

        describe(`GIVEN "${trackableFieldName}" is defined on the object being tracked`, () => {
            beforeEach(() => {
                trackableObject[trackableFieldName] = arbitraryValue;
            });

            it(`returns a function that plucks the corresponding value of the trackable object's "${trackableFieldName}" member`, () => {
                const trackBy = trackByFunctions.by(trackableFieldName);
                expect(trackBy(-1, trackableObject)).toEqual(arbitraryValue);
            });
        });
    });
});
