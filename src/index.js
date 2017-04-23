import "./styles.scss";
import component from "./component";

const VERSION_INFO = { version: __VERSION, build: __BUILD };

// LINE CHART TOOL
const LineChart = Vizabi.Tool.extend("LineChart", {
  /**
   * Initialized the tool
   * @param {Object} placeholder Placeholder element for the tool
   * @param {Object} external_model Model as given by the external page
   */
  init(placeholder, external_model) {

    this.name = "linechart";

    this.components = [{
      component,
      placeholder: ".vzb-tool-viz",
      model: ["state.time", "state.entities", "state.marker", "locale", "ui"] //pass models to component
    }, {
      component: Vizabi.Component.get("timeslider"),
      placeholder: ".vzb-tool-timeslider",
      model: ["state.time", "state.entities", "state.marker", "ui"],
      ui: { show_value_when_drag_play: false, axis_aligned: true }
    }, {
      component: Vizabi.Component.get("dialogs"),
      placeholder: ".vzb-tool-dialogs",
      model: ["state", "ui", "locale"]
    }, {
      component: Vizabi.Component.get("buttonlist"),
      placeholder: ".vzb-tool-buttonlist",
      model: ["state", "ui", "locale"]
    }, {
      component: Vizabi.Component.get("treemenu"),
      placeholder: ".vzb-tool-treemenu",
      model: ["state.marker", "state.marker_tags", "state.time", "locale"]
    }, {
      component: Vizabi.Component.get("datawarning"),
      placeholder: ".vzb-tool-datawarning",
      model: ["locale"]
    }, {
      component: Vizabi.Component.get("datanotes"),
      placeholder: ".vzb-tool-datanotes",
      model: ["state.marker", "locale"]
    }, {
      component: Vizabi.Component.get("steppedspeedslider"),
      placeholder: ".vzb-tool-stepped-speed-slider",
      model: ["state.time", "locale"]
    }];

    this._super(placeholder, external_model);
  },

  default_model: {
    "state": {
      "time": {
        "autogenerate": {
          "data": "data",
          "conceptIndex": 0,
          "conceptType": "time"
        }
      },
      "entities": {
        "autogenerate": {
          "data": "data",
          "conceptIndex": 0
        }
      },
      "entities_colorlegend": {
        "autogenerate": {
          "data": "data",
          "conceptIndex": 0
        }
      },
      "entities_tags": {},
      "marker_tags": {
        "space": ["entities_tags"],
        "label": {},
        "hook_parent": {}
      },
      "entities_allpossible": {
        "autogenerate": {
          "data": "data",
          "conceptIndex": 0
        }
      },
      "marker_allpossible": {
        "space": ["entities_allpossible"],
        "label": {
          "use": "property",
          "autogenerate": {
            "conceptIndex": 0
          }
        }
      },
      "marker": {
        "space": ["entities", "time"],
        "axis_x": {
          "use": "indicator",
          "allow": { scales: ["time"] },
          "autogenerate": {
            "conceptIndex": 0,
            "conceptType": "time"
          }
        },
        "axis_y": {
          "use": "indicator",
          "allow": { scales: ["linear", "log"] },
          "autogenerate": {
            "conceptIndex": 0,
            "conceptType": "measure"
          }
        },
        "label": {
          "use": "property",
          "autogenerate": {
            "conceptIndex": 0
          }
        },
        "color": {
          "syncModels": ["marker_colorlegend"],
          "autogenerate": {
            "conceptIndex": 0,
            "conceptType": "entity_set"
          }
        }
      },
      "marker_colorlegend": {
        "space": ["entities_colorlegend"],
        "label": {
          "use": "property",
          "which": "name"
        },
        "hook_rank": {
          "use": "property",
          "which": "rank"
        },
        "hook_geoshape": {
          "use": "property",
          "which": "shape_lores_svg"
        }
      }
    },
    locale: { },
    "ui": {
      "chart": {
        "labels": {
          "min_number_of_entities_when_values_hide": 2 //values hide when showing 2 entities or more
        },
        "whenHovering": {
          "hideVerticalNow": false,
          "showProjectionLineX": true,
          "showProjectionLineY": true,
          "higlightValueX": true,
          "higlightValueY": true,
          "showTooltip": false
        }
      },
      datawarning: {
        doubtDomain: [],
        doubtRange: []
      },
      "buttons": ["colors", "find", "show", "moreoptions", "fullscreen", "presentation"],
      "dialogs": {
        "popup": ["colors", "find", "show", "moreoptions"],
        "sidebar": ["colors", "show"],
        "moreoptions": ["opacity", "speed", "axes", "colors", "presentation", "about"]
      },
      "presentation": false
    }
  },

  versionInfo: VERSION_INFO
});

export default LineChart;
