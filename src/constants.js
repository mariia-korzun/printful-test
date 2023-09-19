const ETALON_PLACEMENT_NAME = "front";
const INITIAL_STATE = {
  layers: [
    {
      id: 0,
      name: "layer1",
      fill: "#3f2222",
      width: 35,
      height: 25,
      left: 10,
      top: 5,
    },
    {
      id: 1,
      name: "layer2",
      fill: "#3f2277",
      width: 30,
      height: 30,
      left: 20,
      top: 50,
    },
  ],
  factors: {},
  placements: [
    {
      id: 0,
      name: "front",
      width: 100,
      height: 100,
      area: {
        top: 50,
        left: 100,
        width: 200,
        height: 320,
      },
      image: "public/images/front.svg",
    },
    {
      id: 1,
      name: "back",
      width: 50,
      height: 50,
      area: {
        top: 50,
        left: 100,
        width: 200,
        height: 320,
      },
      image: "public/images/back.svg",
    },
    {
      id: 2,
      name: "left",
      width: 50,
      height: 100,
      area: { top: 70, left: 170, width: 75, height: 120 },
      image: "public/images/left.svg",
    },
    {
      id: 3,
      name: "right",
      width: 50,
      height: 100,
      area: { top: 70, left: 153, width: 75, height: 120 },
      image: "public/images/right.svg",
    },
  ],
  showPlacement: false,
};

export { ETALON_PLACEMENT_NAME, INITIAL_STATE };
