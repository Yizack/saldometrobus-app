export default defineAppConfig({
  ui: {
    colors: {
      primary: "blue",
      secondary: "salmon"
    },
    icons: {
      close: "x",
      chevronDown: "chevron-down",
      check: "check",
      loading: "spinner"
    },
    container: {
      base: "px-2"
    },
    input: {
      slots: {
        root: "w-full"
      },
      variants: {
        size: {
          md: {
            base: "py-4"
          }
        }
      }
    },
    button: {
      slots: {
        base: "uppercase rounded-lg border-0"
      },
      variants: {
        variant: {
          link: "p-0! tex"
        },
        size: {
          md: {
            base: "py-3"
          }
        }
      }
    },
    modal: {
      slots: {
        title: "text-primary"
      }
    },
    navigationMenu: {
      variants: {
        orientation: {
          vertical: {
            link: "py-4 gap-4",
            linkLeadingIcon: "size-6",
            linkLabel: "font-normal",
            list: "px-2"
          }
        }
      }
    },
    dropdownMenu: {
      variants: {
        size: {
          md: {
            item: "p-3"
          }
        }
      }
    },
    table: {
      slots: {
        th: "bg-primary text-inverted",
        root: "border border-default rounded-lg"
      }
    },
    select: {
      variants: {
        size: {
          md: {
            base: "py-3"
          }
        }
      }
    }
  }
});
