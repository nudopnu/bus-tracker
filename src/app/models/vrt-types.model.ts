export interface Stations {
  parameters: Parameter[]
  request: Request
  pins: Pin[]
}

export interface Parameter {
  name: string
  value: string
}

export interface Request {
  coordsLU: CoordsLu
  coordsRL: CoordsRl
}

export interface CoordsLu {
  x: string
  y: string
  mapName: string
}

export interface CoordsRl {
  x: string
  y: string
  mapName: string
}

export interface Pin {
  desc: string
  addDesc: string
  type: string
  id: string
  omc: string
  placeID: string
  locality: string
  layer: string
  gisID: string
  distance: string
  stateless: string
  coords: string
  attrs: Attr[]
  infos?: Infos
}

export interface Attr {
  name: string
  value: string
}

export interface Infos {
  info: Info
}

export interface Info {
  infoLinkText: string
  infoLinkURL: string
  infoText: InfoText
  paramList: ParamList[]
  additionalLinks: AdditionalLink[]
}

export interface InfoText {
  content: string
  subtitle: string
  subject: string
  additionalText: string
  htmlText: string
  wmlText: string
  smsText: string
  speechText: string
}

export interface ParamList {
  type: string
  name: string
  value: string
  edit: string
}

export interface AdditionalLink {
  ID: string
  linkURL: string
  linkText: string
  linkTextShort: string
  linkTarget: string
}
