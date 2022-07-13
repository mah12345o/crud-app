import React from "react";
import ReactDOM from "react-dom";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm
} from "react-crud-table";

// Component's Base CSS
import "./index.css";

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let tasks = [
  {
    id: 1,
    username: "Create an example",
    description: "Create an example of how to use the component",
    phon: "Create an examplex",
    descriptiosn: "Create an example of how to use the component",
    titale: "Create an example",
    descsription: "Create an example of how to use the component",
    titdle: "Create an example",
    des2ription: "Create an example of how to use the component",
    titdsle: "Create an example",
    des2cription: "Create an example of how to use the component"
  }
];

const SORTERS = {
  NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a))
};

const getSorter = (data) => {
  const mapper = (x) => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === "id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

let count = tasks.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(tasks);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (task) => {
    count += 1;
    tasks.push({
      ...task,
      id: count
    });
    return Promise.resolve(task);
  },
  update: (data) => {
    const task = tasks.find((t) => t.id === data.id);
    task.username = data.username;
    task.phon = data.phon;
   
    task.website = data.website;
     task.email = data.email;
    return Promise.resolve(task);
  },
  delete: (data) => {
    const task = tasks.find((t) => t.id === data.id);
    tasks = tasks.filter((t) => t.id !== task.id);
    return Promise.resolve(task);
  }
};

const styles = {
  container: { margin: "auto", width: "fit-content" }
};

const Example = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Tasks"
      fetchItems={(payload) => service.fetchItems(payload)}
    >
      <Fields>
        <Field name="id" label="Id" hideInCreateForm />
        <Field name="username" label="Username" placeholder="Username" />
        <Field name="phon" label="Phone" placeholder="Phon" />
        <Field name="website" label="Website" placeholder="Website" />
        <Field
          name="email"
          label="Email"
          render={DescriptionRenderer}
        />
      </Fields>
      <CreateForm
        username="Task Creation"
        message="Create a new task!"
        trigger="Create Task"
        onSubmit={(task) => service.create(task)}
        submitText="Create"
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "Please, provide task's username";
          }
 
          if (!values.phon) {
            errors.phon = "Please, provide task's description";
          }  
          if (!values.website) {
            errors.Website = "Please, provide task's description";
          }
          if (!values.email) {
            errors.email = "Please, provide task's description";
          }
         
        

          return errors;
        }}
      />

      <UpdateForm
        username="Task Update Process"
        message="Update task"
        trigger="Update"
        onSubmit={(task) => service.update(task)}
        submitText="Update"
        validate={(values) => {
          const errors = {};

          if (!values.id) {
            errors.id = "Please, provide id";
          }

          if (!values.username) {
            errors.username = "Please, provide task's username";
          }
          if (!values.phon) {
            errors.phon = "Please, provide task's description";
          }
          if (!values.website) {
            errors.Website = "Please, provide task's description";
          }

          if (!values.email) {
            errors.email = "Please, provide task's description";
          }

          return errors;
        }}
      />

      <DeleteForm
        username="Task Delete Process"
        message="Are you sure you want to delete the task?"
        trigger="Delete"
        onSubmit={(task) => service.delete(task)}
        submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values.id) {
            errors.id = "Please, provide id";
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);

Example.propTypes = {};

ReactDOM.render(<Example />, document.getElementById("root"));
