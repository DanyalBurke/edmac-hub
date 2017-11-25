Feature: Login and logout

  Background:
    Given Nobody is going currently

  Scenario: I can log in
    Given I have not been to the website before
    When I type in my name 'Brian Burke' and login
    Then I see the intentions screen

  Scenario: It remembers my logins
    Given I have logged in previously as 'Brian Burke'
    When I visit the site
    Then I see the intentions screen

  Scenario: I can log out
    Given I have logged in previously
    When I log out
    Then I see the login screen
    And When I visit the site again
    Then I see the login screen

Feature: Adding intentions

  Scenario Outline: I can add an intention to visit
    Given I have logged in previously as 'Brian Burke'
    When I choose <time> to go and click I am going
    Then the table shows 'Brian Burke' is going at <time>
    Examples:
       | time  |
       | 12:00 |
       | 13:15 |
       | 19:45 |

  Scenario: I can remove an intention to visit
    Given I have logged in previously as 'Brian Burke'
    When I choose <time> to go and click I am going
    And I click I am not going anymore

  Scenario: Two people can be going
    Given I have logged in previously as 'Brian Burke'
    When I choose 12:00 to go and click I am going
    Given I have logged in previously as 'Danyal Burke'
    When I choose 13:45 to go and click I am going
    Then The table looks like "Brian Burke", 12:00, "Danyal Burke", 13:45