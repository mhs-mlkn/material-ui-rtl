import { JSONPath } from "jsonpath-plus";
import uniq from "lodash/uniq";

const source = {
  "took": 28,
  "timed_out": false,
  "_shards": {
    "total": 45,
    "successful": 45,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": 901,
    "max_score": 0,
    "hits": []
  },
  "aggregations": {
    "2": {
      "buckets": [
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 40
                    }
                  }
                },
                "key": "IOT",
                "doc_count": 40
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "ASR",
                "doc_count": 37
              }
            ]
          },
          "key_as_string": "2019-08-26T00:00:00.000+04:30",
          "key": 1566761400000,
          "doc_count": 167
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 17
                    }
                  }
                },
                "key": "IOT",
                "doc_count": 17
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "ASR",
                "doc_count": 15
              }
            ]
          },
          "key_as_string": "2019-08-27T00:00:00.000+04:30",
          "key": 1566847800000,
          "doc_count": 70
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 15
                    }
                  }
                },
                "key": "IOT",
                "doc_count": 15
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "ASR",
                "doc_count": 6
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "NLU",
                "doc_count": 1
              }
            ]
          },
          "key_as_string": "2019-08-28T00:00:00.000+04:30",
          "key": 1566934200000,
          "doc_count": 78
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "ASR",
                "doc_count": 1
              }
            ]
          },
          "key_as_string": "2019-08-31T00:00:00.000+04:30",
          "key": 1567193400000,
          "doc_count": 11
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": []
          },
          "key_as_string": "2019-09-01T00:00:00.000+04:30",
          "key": 1567279800000,
          "doc_count": 7
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 34
                    }
                  }
                },
                "key": "NLU",
                "doc_count": 34
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "ASR",
                "doc_count": 6
              }
            ]
          },
          "key_as_string": "2019-09-02T00:00:00.000+04:30",
          "key": 1567366200000,
          "doc_count": 84
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "ASR",
                "doc_count": 51
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 15
                    }
                  }
                },
                "key": "NLU",
                "doc_count": 15
              }
            ]
          },
          "key_as_string": "2019-09-03T00:00:00.000+04:30",
          "key": 1567452600000,
          "doc_count": 136
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 4
                    }
                  }
                },
                "key": "IOT",
                "doc_count": 4
              }
            ]
          },
          "key_as_string": "2019-09-04T00:00:00.000+04:30",
          "key": 1567539000000,
          "doc_count": 8
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 4
                    }
                  }
                },
                "key": "IOT",
                "doc_count": 4
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 2
                    }
                  }
                },
                "key": "NLU",
                "doc_count": 2
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "ASR",
                "doc_count": 1
              }
            ]
          },
          "key_as_string": "2019-09-05T00:00:00.000+04:30",
          "key": 1567625400000,
          "doc_count": 24
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "ASR",
                "doc_count": 1
              }
            ]
          },
          "key_as_string": "2019-09-06T00:00:00.000+04:30",
          "key": 1567711800000,
          "doc_count": 2
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "ASR",
                "doc_count": 6
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 2
                    }
                  }
                },
                "key": "IOT",
                "doc_count": 2
              }
            ]
          },
          "key_as_string": "2019-09-07T00:00:00.000+04:30",
          "key": 1567798200000,
          "doc_count": 16
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 1
                    }
                  }
                },
                "key": "IOT",
                "doc_count": 1
              }
            ]
          },
          "key_as_string": "2019-09-08T00:00:00.000+04:30",
          "key": 1567884600000,
          "doc_count": 15
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 1
                    }
                  }
                },
                "key": "IOT",
                "doc_count": 1
              }
            ]
          },
          "key_as_string": "2019-09-11T00:00:00.000+04:30",
          "key": 1568143800000,
          "doc_count": 2
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 1
                    }
                  }
                },
                "key": "IOT",
                "doc_count": 1
              }
            ]
          },
          "key_as_string": "2019-09-12T00:00:00.000+04:30",
          "key": 1568230200000,
          "doc_count": 2
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "ASR",
                "doc_count": 48
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "sentiment",
                "doc_count": 14
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 9
                    }
                  }
                },
                "key": "NLU",
                "doc_count": 13
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "TRA",
                "doc_count": 11
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 9
                    }
                  }
                },
                "key": "IOT",
                "doc_count": 9
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "normalizer",
                "doc_count": 5
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "isformal",
                "doc_count": 2
              }
            ]
          },
          "key_as_string": "2019-09-14T00:00:00.000+04:30",
          "key": 1568403000000,
          "doc_count": 230
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 7
                    }
                  }
                },
                "key": "IOT",
                "doc_count": 7
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "ASR",
                "doc_count": 4
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 2
                    }
                  }
                },
                "key": "NLU",
                "doc_count": 2
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "sentiment",
                "doc_count": 2
              }
            ]
          },
          "key_as_string": "2019-09-15T00:00:00.000+04:30",
          "key": 1568489400000,
          "doc_count": 31
        },
        {
          "3": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 0
                    }
                  }
                },
                "key": "ASR",
                "doc_count": 7
              },
              {
                "4": {
                  "buckets": {
                    "fasokhan": {
                      "5": {
                        "buckets": {
                          "input": {
                            "doc_count": 0
                          }
                        }
                      },
                      "doc_count": 2
                    }
                  }
                },
                "key": "IOT",
                "doc_count": 2
              }
            ]
          },
          "key_as_string": "2019-09-16T00:00:00.000+04:30",
          "key": 1568575800000,
          "doc_count": 18
        }
      ]
    }
  },
  "status": 200
}


const temp = `[
  {type: "DATE", key: "name", sourcePath: "aggregations.2.buckets[*]", valuePath: "key"},
  {type: "NUMBER", keyPath: "3.buckets[*].key", valuePath: "4.buckets.fasokhan.5.buckets.input.doc_count"}
]`;

processElastic(temp, source);

export default function processElastic(templateStr, data) {
  // eslint-disable-next-line
  const template = eval("(" + templateStr + ")");
  const colsIndex = {};
  let cols = [];
  
  for (let index = 0; index < template.length; index++) {
    const col = template[index];
    
    if (index === 0) {
      cols = cols.concat({
        key: col.key || "name",
        type: col.type
      });
    }
    else {
      const path = `${template[0].sourcePath}.${col.keyPath}`;
      const _cols = uniq(JSONPath(path, data)).map(c => ({key: c, type: col.type}));
      cols = cols.concat(_cols);
    }
  }

  cols.map((col, i) => (colsIndex[col.key] = i));
  
  console.dir(colsIndex);
}