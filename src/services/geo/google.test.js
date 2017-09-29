import { DistanceBetween } from "./google";

it("distance between", () => {
    expect(
        DistanceBetween(
            {
                lng: -116.89539444444445,
                lat: 34.08325833333333
            },
            {
                lng: -116.89539444444445,
                lat: 34.08325833333333
            }
        )
    ).toEqual(0);

    expect(
        DistanceBetween(
            {
                lng: -124.12545833333333,
                lat: 44.136275
            },
            {
                lng: -116.89539444444445,
                lat: 34.08325833333333
            }
        )
    ).toEqual(1278878);
});
