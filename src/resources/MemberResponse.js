/**
 * Member response.
 */
function memberResponse(member) {
  return {
    message: "Successfully Store Member",
    member: {
      id: member.id,
      code: member.code,
      name: member.name,
    },
  };
}

module.exports = memberResponse;
