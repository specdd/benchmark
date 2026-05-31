# SpecDD Benchmark

A small todo app demonstrator for **SpecDD**.

The project shows how code can be guided by `.sdd` specs. Root app concerns live in `example.sdd`; source code and
source-local specs live in `src/`; tests live in `tests/`.

## Purpose

This repository is a minimal benchmark/demo for experimenting with SpecDD-style development:

- specs define local intent and constraints
- implementation follows nearby specs
- tests verify expected behavior

## Structure

```text
.specdd/   SpecDD bootstrap instructions
example.sdd Root app/repository spec
src/       Todo app source code and colocated .sdd specs
tests/     Test suite
````

## License

Code is licensed under the Apache License 2.0.

## FAQ

### Why JavaScript?

JavaScript is used because most developers understand it. The language is not the point; it only serves as a familiar
demonstration target.

### Is this a production todo app?

No. It is intentionally small and exists to demonstrate SpecDD concepts.

### What should I look at first?

Start with `.specdd/bootstrap.*.md`, then inspect `example.sdd`, `src/src.sdd`, and the colocated `.sdd` files in `src/`.

### The specs are longer than the code!

The specs in this example are intentionally heavier than the code. This is an artifact of the demonstrator, not a
requirement or limitation of SpecDD. The app is deliberately small so the specs can clearly show how SpecDD works:
ownership, constraints, tasks, scenarios, and local authority. In a larger or more complex project, the ratio will
normally reverse itself quite quickly.

### Can this work with other languages?

Yes. SpecDD is language-agnostic. The same approach can be used with Python, Go, PHP, TypeScript, Java, or other stacks.
