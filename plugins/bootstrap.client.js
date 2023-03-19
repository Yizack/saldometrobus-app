import "bootstrap/js/dist/offcanvas";
import "bootstrap/js/dist/dropdown";
import Modal from "bootstrap/js/dist/modal";

export default defineNuxtPlugin(() => {
  return {
    provide: { Modal }
  };
});
