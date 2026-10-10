function GameButton({ children, href }) {
  if (href) {
    return (
      <a className="game-button" href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return <button className="game-button" type="button">{children}</button>;
}

export default GameButton
