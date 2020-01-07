import React, { useState, useEffect } from "react";
import GenericForm from "./common/genericForm";
import Joi from "@hapi/joi";

var testID = 0;

/* 
   generic example of <select> with <options>
  
  also note, 
    I've hidden the _id field using "type: hidden"  (inputfields)

      <TestFormSelect
        onSubmit={e => console.log(e)}
        priorities={[
          "when you have some time...",
          "please make some time for ...",
          "don't, you ...forget about",
          "OK Seriously... ",
          "TOP PRIORITY!"
        ]}
      />

*/

const inputfields = {
  _id: {
    type: "hidden",
    rules: Joi.string().required()
  },
  description: {
    label: "Description",
    rules: Joi.string()
      .required()
      .label("Description")
  },
  priority: {
    label: "Priority",
    type: "select",
    options: [],
    rules: Joi.string()
      .required()
      .label("Priority")
  }
};

const TestFormSelect = props => {
  const { onSubmit, priorities } = props;
  const [testFormInit, setTestFormInit] = useState(false);

  const [testFormState, setTestFormState] = useState({
    data: {
      _id: "",
      description: "",
      priority: ""
    },
    priorities: [],
    errors: []
  });

  useEffect(() => {
    if (!testFormInit) {
      setTestFormInit(true); // shut the front door
      const cloned = { ...testFormState };
      cloned.data._id = String(testID + 1); // example of populating the _id when invoked
      // populate <select /> with prop.priorities as <option />('s)
      inputfields.priority["options"] = ["Priority", ...priorities]; // the title of this <select /> appears to be in position 0
      cloned.priorities = priorities;
      setTestFormState(cloned);
    }
  }, [testFormInit, priorities, testFormState]);

  const handleSubmit = newTest => {
    const cloned = { ...testFormState };
    setTestFormState(cloned);
    console.log(`saving new test ${cloned.title}`);
    onSubmit(cloned);
  };

  const handleChange = newState => {
    const cloned = { ...testFormState };
    cloned.data = newState.data;
    cloned.errors = newState.errors;
    setTestFormState(cloned);
  };

  return (
    <GenericForm
      inputfields={inputfields}
      onSubmit={handleSubmit}
      onChange={handleChange}
      formtitle="Test"
      buttonlabel="Save"
      state={testFormState}
    />
  );
};

export default TestFormSelect;
