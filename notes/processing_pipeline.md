# Processing pipeline

The Lookbook processing pipeline consists of three main steps:

1. File tree generation
2. Artifact tree generation (from file tree)
3. Entity tree generation (from artifact tree)

## FileTree 

1. **Preparation**: Registered `FileTree#before_load` handlers are run.
2. **Generation**: File nodes are loaded via a `FileLoader` (e.g. `FilesystemLoader`)
3. **Mutation**: Registered `FileTree#after_load` handlers are run - these can apply visitors to mutate the file tree.
4. **Updating**: 

### Loaders

* `FilesystemLoader`

### Nodes

* `FileNode`
* `DirectoryNode`

## ArtifactTree

1. **Preparation**: Registered `ArtifactTree#before_transform` handlers are run.
2. **Generation**: The file tree is transformed to a new **artifact** tree via a `TreeTransformer` vistor (e.g. `ArtifactTreeTransformer`). Each artifact is created using its corresponding `Initializer` visitor (i.e. a Spec node is intialized via a `SpecNodeInitializer`).
3. **Mutation**: Registered `ArtifactTree#after_transform` visitors are applied to mutate the artifact tree.

### Transformers

* `ArtifactTreeTransformer`

### Nodes

* `FolderNode`
  * `DocumentNode`
  * `SpecNode`
  * `DataNode`
  * `AssetNode`
* `DocumentNode`
  * `ProseNode`
  * `PreviewNode`
  * `SectionNode`
    * `ProseNode`
    * `PreviewNode`
* `SpecNode`
  * `ProseNode`
  * `PreviewNode`
  * `ScenarioNode`
    * `PreviewNode`
* `DataNode`
* `AssetNode`
* `ComponentNode`?
* `TemplateNode`?

### Initializers

* `FolderNodeInitializer`
* `DocumentNodeInitializer`
* `SpecNodeInitializer`
* `AssetNodeInitializer`
* `DataNodeInitializer`

## ArtifactTree

1. **Preparation**: Registered `EntityTree#before_transform` handlers are run.
2. **Generation**: The artifact tree is transformed to a new **entity** tree via a `TreeTransformer` vistor (e.g. `EntityTreeTransformer`). Each entity is created using its corresponding `Initializer` visitor (i.e. a Page node is intialized via a `PageNodeInitializer`).
3. **Mutation**: Registered `EntityTree#after_transform` handlers are run - these can apply visitors to mutate the en entity tree

### Transformers

* `ArtifactTreeTransformer`

### Nodes

* `GroupNode`
* `PageNode`
* `InspectorNode`

### Initializers

* `GroupNodeInitializer`
* `PageNodeInitializer`
* `InspectorNodeInitializer`

# Conversion

After a tree is generated it can be converted to structured data formats using one of the available `Converter` visitors:

* `HashConverter`
* `JSONConverter`

---

## Tree classes

### Instance methods:

* `Tree#create`
* `Tree#update`

### Class methods

* `Tree#before_create`
* `Tree#after_create`

## Visitors

* Define handlers for specific node types using the `Visitor#handle` class method within the class body.

<!--

Common attributes:

* id
* data

# Folder

### Props

* name
* label
* icon

### Attributes

* data
* file

### Child nodes

* pages
* specs
* folders

---

# Spec

### Props

* name
* label
* icon

### Attributes

* data
* file

### Child nodes

* pages
* scenarios

---

# Scenario

### Props

* name
* label
* icon

### Attributes

* data

### Child nodes

* notes (max 1)
* params (max 1)
* example

---

# Notes

---

# Example


-->