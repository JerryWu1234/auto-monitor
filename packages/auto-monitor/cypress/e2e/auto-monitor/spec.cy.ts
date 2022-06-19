describe('empty spec', () => {
  before(() => {
    cy.visit('http://localhost:3000/')
  })
  it('visit page', () => {
    const session = JSON.parse(sessionStorage.getItem('monitor') || '{}')
    expect(session.consoleType, 'route')
    expect(session.event, 'pageshow')
    cy.window().should((e) => {
      expect((e as any).monitorlist.length).to.eq(1)
    })
  })
  it('excute click event', () => {
    const session = JSON.parse(sessionStorage.getItem('monitor') || '{}')
    cy.get('.click1').click()
    expect(session.consoleType, 'click')
    expect(session.consoleType.clickArg, '{ sd: \'23\' }')
  })

  it('test route jump', () => {
    cy.get('[href="/page2"]').click()
    const session = JSON.parse(sessionStorage.getItem('monitor') || '{}')
    expect(session.consoleType, 'route')
    expect(session.to, '/page2')
    expect(session.from, '/')
    cy.window().should((e) => {
      expect((e as any).monitorlist.length).to.eq(4)
      // 路由离开
      expect((e as any).monitorlist[2].state).to.eq(1)
      // 路由进入
      expect((e as any).monitorlist[3].state).to.eq(0)
    })
  })
  it('test route jump boack', () => {
    cy.get('[href="/"]').click()
    const session = JSON.parse(sessionStorage.getItem('monitor') || '{}')
    expect(session.consoleType, 'route')
    expect(session.from, '/page2')
    expect(session.to, '/')
    cy.window().should((e) => {
      expect((e as any).monitorlist.length).to.eq(6)
      // 路由离开
      expect((e as any).monitorlist[4].state).to.eq(1)
      // 路由进入
      expect((e as any).monitorlist[5].state).to.eq(0)
    })
  })
})
