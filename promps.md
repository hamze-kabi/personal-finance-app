regarding zustand test page:

1.  still reset all does not change sidebar open to yes
2.  when toggle loading button is clicked, loading state does not change and the following error is displayed in the console:
    [browser] Uncaught TypeError: setTransactionsLoading is not a function
    at onClick (app/test/page.tsx:182:11)
    at button (<anonymous>)
    at TestZustandPage (app/test/page.tsx:177:7)
    180 | setSelectedCategory("");
    181 | setSortOption("newest");
    > 182 | setTransactionsLoading(false);
          |           ^
    183 | setBudgetsLoading(false);
    184 | setPotsLoading(false);
    185 | setBillSearchQuery("");

all the toggle loading buttons display the same error, but with their corresponding name
