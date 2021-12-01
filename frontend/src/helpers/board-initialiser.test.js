import initialiseChessBoard from "./board-initialiser";

test("adds properly", () => {
  expect(initialiseChessBoard()).toEqual([
    {
      notation: "a8",
      piece: {
        name: "R",
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg')",
        },
      },
    },
    {
      notation: "b8",
      piece: {
        name: "N",
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg')",
        },
      },
    },
    {
      notation: "c8",
      piece: {
        name: "B",
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg')",
        },
      },
    },
    {
      notation: "d8",
      piece: {
        name: "Q",
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg')",
        },
      },
    },
    {
      notation: "e8",
      piece: {
        name: "K",
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg')",
        },
      },
    },
    {
      notation: "f8",
      piece: {
        name: "B",
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg')",
        },
      },
    },
    {
      notation: "g8",
      piece: {
        name: "N",
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg')",
        },
      },
    },
    {
      notation: "h8",
      piece: {
        name: "R",
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg')",
        },
      },
    },
    {
      notation: "a7",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg')",
        },
      },
    },
    {
      notation: "b7",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg')",
        },
      },
    },
    {
      notation: "c7",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg')",
        },
      },
    },
    {
      notation: "d7",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg')",
        },
      },
    },
    {
      notation: "e7",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg')",
        },
      },
    },
    {
      notation: "f7",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg')",
        },
      },
    },
    {
      notation: "g7",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg')",
        },
      },
    },
    {
      notation: "h7",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 2,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg')",
        },
      },
    },
    { notation: "a6", piece: null },
    { notation: "b6", piece: null },
    { notation: "c6", piece: null },
    { notation: "d6", piece: null },
    { notation: "e6", piece: null },
    { notation: "f6", piece: null },
    { notation: "g6", piece: null },
    { notation: "h6", piece: null },
    { notation: "a5", piece: null },
    { notation: "b5", piece: null },
    { notation: "c5", piece: null },
    { notation: "d5", piece: null },
    { notation: "e5", piece: null },
    { notation: "f5", piece: null },
    { notation: "g5", piece: null },
    { notation: "h5", piece: null },
    { notation: "a4", piece: null },
    { notation: "b4", piece: null },
    { notation: "c4", piece: null },
    { notation: "d4", piece: null },
    { notation: "e4", piece: null },
    { notation: "f4", piece: null },
    { notation: "g4", piece: null },
    { notation: "h4", piece: null },
    { notation: "a3", piece: null },
    { notation: "b3", piece: null },
    { notation: "c3", piece: null },
    { notation: "d3", piece: null },
    { notation: "e3", piece: null },
    { notation: "f3", piece: null },
    { notation: "g3", piece: null },
    { notation: "h3", piece: null },
    {
      notation: "a2",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg')",
        },
      },
    },
    {
      notation: "b2",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg')",
        },
      },
    },
    {
      notation: "c2",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg')",
        },
      },
    },
    {
      notation: "d2",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg')",
        },
      },
    },
    {
      notation: "e2",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg')",
        },
      },
    },
    {
      notation: "f2",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg')",
        },
      },
    },
    {
      notation: "g2",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg')",
        },
      },
    },
    {
      notation: "h2",
      piece: {
        initialPositions: {
          1: [48, 49, 50, 51, 52, 53, 54, 55],
          2: [8, 9, 10, 11, 12, 13, 14, 15],
        },
        name: null,
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg')",
        },
      },
    },
    {
      notation: "a1",
      piece: {
        name: "R",
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg')",
        },
      },
    },
    {
      notation: "b1",
      piece: {
        name: "N",
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg')",
        },
      },
    },
    {
      notation: "c1",
      piece: {
        name: "B",
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg')",
        },
      },
    },
    {
      notation: "d1",
      piece: {
        name: "Q",
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg')",
        },
      },
    },
    {
      notation: "e1",
      piece: {
        name: "K",
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg')",
        },
      },
    },
    {
      notation: "f1",
      piece: {
        name: "B",
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg')",
        },
      },
    },
    {
      notation: "g1",
      piece: {
        name: "N",
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg')",
        },
      },
    },
    {
      notation: "h1",
      piece: {
        name: "R",
        player: 1,
        style: {
          backgroundImage:
            "url('https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg')",
        },
      },
    },
  ]);
});
