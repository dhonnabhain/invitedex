import axios from "axios";
import mitt from "mitt";
import controls from "~/core/controls";
import containerGetter from "~/core/helpers";

const globalEmitter = mitt();
let screenContainer = {};
let currentScreen = "loading";
let oldScreen = "loading";
let parameters = null;
let guests = [];

async function getGuests() {
  guests = (await axios.get("/api/guests")).data;
}

async function boot() {
  const container = containerGetter();
  container.innerHTML = "";
  delete screenContainer.screen;

  const screen = await import(`./screens/${currentScreen}Screen`);
  screenContainer.screen = screen;
  screenContainer.screen.default(globalEmitter, parameters);
}

globalEmitter.on("CHANGE_SCREEN", (props) => {
  oldScreen = currentScreen;
  currentScreen = props.screen;
  parameters =
    props.screen === "guests" ? { ...props.params, guests } : props.params;

  boot();

  controls(globalEmitter, currentScreen, oldScreen);
});

export default function () {
  getGuests();
  boot();
}
