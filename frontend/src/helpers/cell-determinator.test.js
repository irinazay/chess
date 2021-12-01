import CellDeterminator from "./cell-determinator";


test("determine cell", () =>{
    expect(CellDeterminator("h1")).toEqual(63)
} )

test("determine cell", () =>{
    expect(CellDeterminator("e2")).toEqual(52)
} )

