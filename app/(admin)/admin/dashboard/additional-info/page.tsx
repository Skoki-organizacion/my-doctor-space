import React from "react";

function NewlyCreatedUserAdditionalInfo() {
  return (
    <div>
      <FormField
        control={form.control}
        name="clinic"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Clinic</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select clinic" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {clinics.map((clinic) => (
                  <SelectItem
                    key={clinic}
                    value={clinic}
                    className="cursor-pointer"
                  >
                    {clinic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="department"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Department</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem
                    key={department}
                    value={department}
                    className="cursor-pointer"
                  >
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="study"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Study</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Study" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default NewlyCreatedUserAdditionalInfo;
