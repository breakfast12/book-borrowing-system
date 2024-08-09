/**
 * Member Detail response.
 */
function memberDetailResponse(member) {
  return {
    message: "Successfully Show Detail Member",
    member: {
      id: member.id,
      code: member.code,
      name: member.name,
    },
  };
}

module.exports = memberDetailResponse;
