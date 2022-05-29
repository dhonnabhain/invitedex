import axios from "axios";
import sortBy from "lodash.sortby";

function ucFirst(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default defineEventHandler(async () => {
  const { notionProject, notionToken } = useRuntimeConfig();

  const {
    data: { results },
  } = await axios.post(
    `https://api.notion.com/v1/databases/${notionProject}/query`,
    { page_size: 300 },
    {
      headers: {
        "Notion-Version": "2021-08-16",
        Authorization: `Bearer ${notionToken}`,
      },
    }
  );

  let guests = results
    .sort((guest) => guest.properties.order.number)
    .map((guest) => {
      guest.id = guest.properties.order.number;
      guest.name = guest.properties.Name.title[0].plain_text
        .split(" ")
        .map(ucFirst)
        .join(" ");
      guest.relation = ucFirst(
        guest.properties.relation.rich_text[0].plain_text
      );
      guest.sprite = guest.properties.sprite.rich_text[0].plain_text;
      guest.coordinates =
        guest.properties.coordinates.rich_text[0].plain_text.split(",");
      guest.description = guest.properties.description.rich_text[0].plain_text;

      return guest;
    });

  return sortBy(guests, (guest) => guest.id);
});
