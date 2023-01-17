import React, { ReactNode } from 'react'
import styles from '../../../../styles/Panel.module.css'
import navItems from '../../textContent/Panel/navItems'

type Props = {
  children: ReactNode
}

const Panel = (props: Props) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Header}>Header</div>
      <div className={styles.FlexContainer}>
        <aside className={styles.Aside}>
          <div className={styles.NavItems}>
            {navItems.map((item) => {
              return (
                <div className={styles.NavItem} key={item.id}>
                  {item.text}
                </div>
              )
            })}
          </div>
        </aside>
        {props.children}
      </div>
    </div>
  )
}

export default Panel
