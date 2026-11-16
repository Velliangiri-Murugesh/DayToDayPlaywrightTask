import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'


test('accessbilityValidation',{tag:'@wcag'},async({page},testInfo)=>{

     await page.goto('/login');

     const results=await new AxeBuilder({page}).analyze();

     if (results.violations.length > 0) {
    const detectedRules = results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.help,
      nodesAffected: v.nodes.length,
    }));

    console.log('Detected Axe Rule IDs:', detectedRules);

    await testInfo.attach('accessibility-violations', {
      body: JSON.stringify(detectedRules, null, 2),
      contentType: 'application/json',
    });
  }

  // Filter strictly for critical or serious violations
  const highImpactViolations = results.violations.filter(
    (violation) => violation.impact === 'critical' || violation.impact === 'serious'
  );

  // Assert on the filtered array (provides readable failure output with rule IDs)
  expect(
    highImpactViolations,
    `Found ${highImpactViolations.length} critical/serious violations: ${highImpactViolations
      .map((v) => v.id)
      .join(', ')}`
  ).toEqual([]);


})