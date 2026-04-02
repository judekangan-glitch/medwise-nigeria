export const SYMPTOM_DATA = {
  questions: [
    {
      id: "age_group",
      category: "demographics",
      question: {
        en: "What is your age group?",
        pidgin: "How old you be?",
        ha: "Shekarunku nawa ne?",
        yo: "Ọmọ ọdun melo ni ẹ?",
        ig: "Afọ ole ka ị gbara?"
      },
      options: [
        {
          value: "child",
          risk: 2,
          next: 1,
          label: {
            en: "Below 5 years",
            pidgin: "Pikin wey never reach 5 years",
            ha: "Ƙasa da shekara 5",
            yo: "Ondubẹrẹ ọdun marun-un",
            ig: "Onye na-erubeghị afọ ise"
          }
        },
        {
          value: "young",
          risk: 1,
          next: 1,
          label: {
            en: "5-18 years",
            pidgin: "Young person (5-18 years)",
            ha: "Shekara 5 zuwa 18",
            yo: "Ọdun marun-un sí mkejila",
            ig: "Afọ ise ruo iri na asatọ"
          }
        },
        {
          value: "adult",
          risk: 0,
          next: 1,
          label: {
            en: "18-60 years",
            pidgin: "Big person (18-60 years)",
            ha: "Shekara 18 zuwa 60",
            yo: "Agbalagba (Ọdun 18-60)",
            ig: "Okenye (Afọ 18-60)"
          }
        },
        {
          value: "senior",
          risk: 3,
          next: 1,
          label: {
            en: "Above 60 years",
            pidgin: "Mama/Papa (Above 60 years)",
            ha: "Sama da shekara 60",
            yo: "Agbalagba ju ọdun 60 lọ",
            ig: "Ndi gafere afọ 60"
          }
        }
      ]
    },
    {
      id: "existing_conditions",
      category: "demographics",
      question: {
        en: "Do you have any existing health conditions?",
        pidgin: "Anything else dey worry you before?",
        ha: "Kuna da wani ciwo tun da farko?",
        yo: "Njẹ ẹ ní àìsàn kankan tẹlẹ rí?",
        ig: "Ị nwere ọrịa ọ bụla nke ị nweburu?"
      },
      options: [
        {
          value: "none",
          risk: 0,
          next: 2,
          label: {
            en: "No existing conditions",
            pidgin: "Nothing dey worry me",
            ha: "Babu komai",
            yo: "Kò sí àìsàn kankan",
            ig: "Enweghị m ọrịa ọ bụla"
          }
        },
        {
          value: "diabetes",
          risk: 2,
          next: 2,
          label: {
            en: "Diabetes",
            pidgin: "Sugar for body (Diabetes)",
            ha: "Ciwon Suga",
            yo: "Àìsàn Rọpọrọpọ (Tàbí Súgà)",
            ig: "Ọrịa Shuga"
          }
        },
        {
          value: "hypertension",
          risk: 1,
          next: 2,
          label: {
            en: "Hypertension",
            pidgin: "B-P (Hypertension)",
            ha: "Hawan Jini",
            yo: "Ìfúnpá Gíga",
            ig: "Ọbara Mgbali Elu"
          }
        },
        {
          value: "multiple",
          risk: 3,
          next: 2,
          label: {
            en: "Multiple conditions",
            pidgin: "Plenty things dey worry me",
            ha: "Ciwon yana da yawa",
            yo: "Àìsàn melo kan",
            ig: "Ọtụtụ ọrịa dị iche iche"
          }
        }
      ]
    },
    {
      id: "symptom_type",
      category: "primary",
      question: {
        en: "What type of symptoms are you experiencing?",
        pidgin: "Which place inside your body dey worry you?",
        ha: "Wane irin ciwo kuke ji?",
        yo: "Irú àìsàn wo ni ẹ n lára?",
        ig: "Kedu ụdị mgbu ị na-enwe?"
      },
      options: [
        {
          value: "respiratory",
          next: 3,
          label: {
            en: "Respiratory (cough, cold, sore throat)",
            pidgin: "Inside my chest (Cough, Catarrh, Sore throat)",
            ha: "Ciwon Shaka (tari, mura, ciwon makogwaro)",
            yo: "Inu Àyà (Ikọ́, Ọtútù, Ọ̀fun dídùn)",
            ig: "Iku ume (ụkwara, imi na-agba agba, mgbu akpịrị)"
          }
        },
        {
          value: "digestive",
          next: 4,
          label: {
            en: "Digestive (diarrhea, stomach pain)",
            pidgin: "My belle (Running belle, Belle pain)",
            ha: "Ciwon Ciki (zawo, ciwon ciki)",
            yo: "Inú rírù (Inú ríun)",
            ig: "Afọ (ọbara afọ, mgbu afọ)"
          }
        },
        {
          value: "fever",
          next: 7,
          label: {
            en: "Fever (high temperature)",
            pidgin: "Hot body (Fever)",
            ha: "Zazzabi",
            yo: "Ibà (Ara gbígbóná)",
            ig: "Iba (Ahụ ọkụ)"
          }
        }
      ]
    }
    // Note: In a real app, we'd add all 15+ questions here.
    // For the showcase, we'll ensure these high-priority ones are perfect.
  ],
  recommendations: {
    self_care: {
      title: {
        en: "Self-Care Recommended",
        pidgin: "Wetin You Go Do for House",
        ha: "Kulawa Da Kai",
        yo: "Ìtọ́jú Ara",
        ig: "Nlekọta Onwe Gị"
      },
      message: {
        en: "Your symptoms appear mild. Rest, stay hydrated, and monitor your condition.",
        pidgin: "Dis sickness no too bad. Rest, drink plenty water, and check body.",
        ha: "Alamomin ku suna da sauƙi. Huta, sha ruwa sosai, sannan ku lura da yanayin ku.",
        yo: "Àìsàn rẹ kò pọ̀. Sinmi, mu omi dáadáa, kí o sì máa ṣàyẹ̀wò ara rẹ.",
        ig: "Ahụ gị adịghị njọ nke ukwuu. Zurụ ike, nụọ mmiri nke ọma, ma na-eleba anya n'ahụ gị."
      },
      advice: {
        en: ["Rest and stay hydrated", "Monitor symptoms for 48h", "No antibiotics needed"],
        pidgin: ["Rest well and drink plenty water", "Watch your body for 2 days", "You no need antibiotics"],
        ha: ["Huta sosai kuma ku sha ruwa", "Lura da alamomi na tsawon sa'o'i 48", "Ba kwa buƙatar antibiotics"],
        yo: ["Sinmi kí o sì mu omi", "Ṣàyẹ̀wò àìsàn fún wákàtí 48", "O kò nílò ògùn apakòkòrò"],
        ig: ["Zurụ ike ma nụọ mmiri", "Lelee mgbu ahụ ruo awa 48", "Ị dịghị mkpa ọgwụ antibiotics"]
      }
    },
    see_doctor: {
      title: {
        en: "Consult a Doctor",
        pidgin: "Go See Doctor",
        ha: "Tuntuɓi Likita",
        yo: "Lọ rí Dókítà",
        ig: "Gakwuru Dọkịta"
      },
      message: {
        en: "Your symptoms suggest a possible bacterial infection. Please consult a professional.",
        pidgin: "Dis sickness fit be bacteria cause am. Abeg, go see doctor make e check you.",
        ha: "Alamomin ku suna nuna yiwuwar kamuwa da kwayoyin cuta. Da fatan za a tuntuɓi likita.",
        yo: "Àìsàn rẹ dà bíi pé kòkòrò bacteria ló fà á. Ẹ jọ̀ọ́, ẹ lọ rí dókítà.",
        ig: "Ọrịa a nwere ike ịbụ bacteria kpatara ya. Biko gakwuru dọkịta."
      }
    },
    urgent: {
      title: {
        en: "Urgent Care Required!",
        pidgin: "Quick Quick, See Doctor!",
        ha: "Ana Bukatar Kulawa ta Gaggawa!",
        yo: "Ìgbésẹ̀ Kánjúkánjú!",
        ig: "Ihe Ngwa Ngwa!"
      },
      message: {
        en: "Your symptoms are severe. Please seek immediate medical attention.",
        pidgin: "Dis sickness bad well well. Abeg, go hospital now now.",
        ha: "Wannan ciwon yana da muni sosai. Da fatan za a nemi taimakon likita nan take.",
        yo: "Àìsàn yìí nira pupọ. Ẹ jọ̀ọ́, ẹ lọ sí ilé ìwòsàn ní kíákíá.",
        ig: "Ahụ gị adịghị mma ma ọlị. Biko gaa n'ụlọ ọgwụ ozugbo."
      }
    }
  }
}
