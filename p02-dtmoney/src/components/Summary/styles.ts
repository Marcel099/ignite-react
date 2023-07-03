import styled from "styled-components";

export const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -8rem;

  list-style: none;

  li {
    background-color: var(--shape);
    color: var(--text-title);

    padding: 1.5rem 2rem;
    border-radius: 0.25rem;

    &.highlight-background {
      background-color: var(--green);
      color: #fff;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: inline-block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }
  }
`