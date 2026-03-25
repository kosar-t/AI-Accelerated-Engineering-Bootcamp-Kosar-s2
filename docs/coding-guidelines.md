# Coding Guidelines: TODO App

This document describes the coding style and quality principles that all contributors should follow when working on this project. These principles help keep the codebase readable, maintainable, and consistent as the project grows.

---

## DRY — Don't Repeat Yourself

Avoid duplicating logic across the codebase. If the same logic appears in more than one place, extract it into a shared function or component that can be reused. For example, if multiple parts of the app need to format a due date, that formatting logic should live in a single utility function rather than being copied wherever it is needed. Duplication makes bugs harder to fix and changes harder to apply consistently.

---

## KISS — Keep It Simple, Stupid

Prioritize simplicity at every level — in function design, component structure, and data flow. Code that is easy to read is also easy to debug and maintain. Avoid clever or overly abstract solutions when a straightforward approach will do. When in doubt, choose the option that another developer can understand at a glance without needing extra context.

---

## YAGNI — You Aren't Gonna Need It

Do not add functionality until it is actually required. Building features speculatively — because they might be useful later — adds complexity and maintenance burden without delivering value. Focus on what the current requirements ask for and keep the codebase lean. Future needs can be addressed when they arise.

---

## SOLID Principles

Apply the SOLID principles to keep components and modules well-structured and easy to change independently.

The most important of these for this project is the **Single Responsibility Principle (SRP)**: each class, module, or component should have one job and one reason to change. For example, a component that renders a todo item should not also contain the logic for persisting data to the backend — those are separate responsibilities that belong in separate layers. Keeping responsibilities focused makes each unit easier to test, reuse, and modify without unintended side effects.

---

## Boy Scout Rule

Leave the code cleaner than you found it. When working in a file — whether fixing a bug or adding a feature — take a moment to make small improvements to any technical debt you encounter nearby, such as renaming an unclear variable, removing dead code, or simplifying a convoluted condition. These incremental improvements compound over time and prevent the codebase from degrading in quality.
