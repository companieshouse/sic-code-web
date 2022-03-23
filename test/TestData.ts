import CombinedSicActivitiesApiModel from "../src/models/CombinedSicActivitiesApiModel";

export function generateTestData(): CombinedSicActivitiesApiModel[] {
  return [
    {
      id: "62274e14c13c654b602e5fe4",
      sic_code: "01110",
      activity_description: "Barley growing",
      sic_description:
        "Growing of cereals (except rice), leguminous crops and oil seeds",
      is_ch_activity: false,
    },
    {
      id: "62274e14c13c654b602e5fe5",
      sic_code: "11060",
      activity_description: "Barley malting (manufacture)",
      sic_description: "Manufacture of malt",
      is_ch_activity: false,
    },
    {
      id: "62274e14c13c654b602e5fe6",
      sic_code: "10611",
      activity_description: "Barley milling (manufacture)",
      sic_description: "Grain milling",
      is_ch_activity: false,
    },
    {
      id: "62274e14c13c654b602e5fec",
      sic_code: "10611",
      activity_description: "Barley meal production (manufacture)",
      sic_description: "Grain milling",
      is_ch_activity: false,
    },
    {
      id: "62274e14c13c654b602e5fe9",
      sic_code: "10611",
      activity_description:
        "Barley processing (blocked, flaked, puffed or pearled) (manufacture)",
      sic_description: "Grain milling",
      is_ch_activity: false,
    },
  ];
}
