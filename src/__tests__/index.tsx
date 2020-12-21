import { Project, PropertyDeclaration, TypeReferenceNode } from "ts-morph";
import { toSimpleType } from "../ts-simple-type/index";
import ts from "typescript";
import path from "path";
export async function run() {
  console.log(path.join(__dirname, "__fixtures__", "tsconfig.json"));
  const project = new Project({
    tsConfigFilePath: path.join(__dirname, "__fixtures__", "tsconfig.json"),
  });

  const file = project.getSourceFileOrThrow(
    path.join(__dirname, "__fixtures__", "src/index.tsx")
  );
  const checker = project.getTypeChecker();
  // Using https://ts-ast-viewer.com can be useful to figure out what these nodes are...
  // You can also use the functions like `Node.isTypeReferenceNode(node)` to check
  // if a node is of a certain kind.
  const syms = file.getSymbolsInScope(ts.SymbolFlags.Value);
  const fn = file.getFunctionOrThrow("b");
  const cache = new WeakMap<any, any>();

  const retType = fn.getReturnType();
  console.log(
    "retType",
    toSimpleType(retType.compilerType, checker.compilerObject, {
      eager: false,
      cache,
    })
  );
  const propertyDec = file.getInterfaceOrThrow("A").getPropertyOrThrow("key");
  const typeNode = propertyDec.getTypeNodeOrThrow();
  const type = propertyDec.getType();

  console.log("typeNode", type.getText());

  const simpleType = toSimpleType(
    typeNode.compilerNode,
    checker.compilerObject
  );
  console.log(simpleType);
  //console.log(simpleType.target);
}

describe("TS", () => {
  // todo make it work with
  beforeAll(async () => {});
  test("works", async () => {
    await run();
  }, 5000);
});
