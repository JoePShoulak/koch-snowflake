class Koch {
  constructor(sections) {
    this.sections = sections;
    this.latestPreRotations = [];
  }

  fracture() {
    let allNew = [];
    this.latestPreRotations = [];

    this.sections.forEach((s) => {
      const { newSegments, preRotation } = s.fracture();
      this.latestPreRotations.push(preRotation);
      allNew = [...allNew, ...newSegments];
    });

    this.sections = allNew;
  }
}

class Segment {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  fracture() {
    // first section
    const split1 = [
      lerp(this.x1, this.x2, 1 / 3),
      lerp(this.y1, this.y2, 1 / 3),
    ];
    const split2 = [
      lerp(this.x1, this.x2, 2 / 3),
      lerp(this.y1, this.y2, 2 / 3),
    ];

    const seg1 = new Segment(this.x1, this.y1, ...split1);
    const seg2 = new Segment(...split2, this.x2, this.y2);
    const seg3 = new Segment(
      ...rotateLine(...split1, ...split2, ...split1, PI / 3)
    );
    const seg4 = new Segment(
      ...rotateLine(...split1, ...split2, ...split2, -PI / 3)
    );

    return {
      newSegments: [seg1, seg2, seg3, seg4],
      preRotation: new Segment(...split1, ...split2),
    };
  }
}
