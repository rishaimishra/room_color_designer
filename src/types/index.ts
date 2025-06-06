export interface Color {
  id: string;
  name: string;
  code: string;
  hex: string;
  category: string;
  relatedColors?: string[];
}

export interface RoomColors {
  ceiling: string;
  frontWall: string;
  sideWall: string;
}

export type WallType = 'ceiling' | 'frontWall' | 'sideWall';